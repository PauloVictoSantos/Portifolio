"use client"

import { useEffect, useState } from "react"

// ⚠️ PROVÁVEL CAUSA DO BUG: o valor original era "PauloVictoSantos" (sem o "r"
// de "Victor"), que não corresponde a nenhuma conta válida no GitHub — por
// isso a primeira requisição (perfil) sempre falhava com 404, caía no catch,
// e os stats ficavam travados nos valores iniciais (0, [], 0).
// Confirme que este é o seu usuário correto: https://github.com/PauloVictorSantos
const USERNAME = "PauloVictorSantos"
const BASE = "https://api.github.com"

// Opcional, mas recomendado: crie um token (sem nenhuma permissão/scope
// marcada, só leitura pública já é suficiente) em
// https://github.com/settings/tokens e defina NEXT_PUBLIC_GITHUB_TOKEN no
// .env. Sem token, a API do GitHub limita a 60 requisições/hora por IP — fácil
// de estourar em dev (cada carregamento da seção faz uns 8 requests) e os
// erros de rate limit ficavam mascarados como "usuário não encontrado".
const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN
const AUTH_HEADERS: HeadersInit = TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}

export interface Repo {
  id: number
  name: string
  description: string | null
  stargazers_count: number
  language: string | null
  html_url: string
  pushed_at: string
}

export interface GithubData {
  publicRepos: number
  followers: number
  totalCommits: number
  topRepos: Repo[]
  languages: { name: string; count: number; color: string }[]
  recentCommits: { repo: string; message: string; date: string; url: string }[]
  loading: boolean
  error: string | null
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  C: "#A8B9CC",
  "C++": "#f34b7d",
  Python: "#3B82F6",
  HTML: "#e34c26",
  CSS: "#563d7c",
}

async function githubFetch(path: string, extraHeaders: HeadersInit = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      ...AUTH_HEADERS,
      ...extraHeaders,
    },
  })

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error(`Usuário "${USERNAME}" não encontrado no GitHub. Confira o nome de usuário.`)
    }
    if (res.status === 403 || res.status === 429) {
      throw new Error(
        "Limite de requisições da API do GitHub atingido. Configure NEXT_PUBLIC_GITHUB_TOKEN ou tente novamente mais tarde."
      )
    }
    throw new Error(`Erro ao consultar a API do GitHub (status ${res.status})`)
  }

  return res.json()
}

async function fetchAllRepos(username: string): Promise<Repo[]> {
  const all: Repo[] = []
  let page = 1
  while (true) {
    const batch: Repo[] = await githubFetch(
      `/users/${username}/repos?sort=pushed&per_page=100&page=${page}`
    )
    if (!Array.isArray(batch) || batch.length === 0) break
    all.push(...batch)
    if (batch.length < 100) break
    page++
  }
  return all
}

export function useGithub(): GithubData {
  const [data, setData] = useState<GithubData>({
    publicRepos: 0,
    followers: 0,
    totalCommits: 0,
    topRepos: [],
    languages: [],
    recentCommits: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    async function fetchAll() {
      try {
        const [profile, repos] = await Promise.all([
          githubFetch(`/users/${USERNAME}`),
          fetchAllRepos(USERNAME),
        ])

        // Total de commits via Search API — se essa chamada específica falhar
        // (ela tem limite de requisições próprio e mais restrito), não deve
        // derrubar o resto dos dados que já carregaram com sucesso.
        let totalCommits = 0
        try {
          const commitsData = await githubFetch(
            `/search/commits?q=author:${USERNAME}&per_page=1`,
            { Accept: "application/vnd.github.cloak-preview" }
          )
          totalCommits = commitsData.total_count ?? 0
        } catch {
          // segue sem o total exato — a UI cai no fallback (recentCommits.length)
        }

        const topRepos = [...repos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5)

        const langMap: Record<string, number> = {}
        repos.forEach(r => {
          if (r.language) langMap[r.language] = (langMap[r.language] ?? 0) + 1
        })
        const languages = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            count,
            color: LANG_COLORS[name] ?? "#888",
          }))

        const recentRepos = [...repos]
          .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
          .slice(0, 5)

        const commitResults = await Promise.allSettled(
          recentRepos.map(r =>
            githubFetch(`/repos/${USERNAME}/${r.name}/commits?per_page=2`).then(
              (commits: any[]) =>
                commits.map(c => ({
                  repo: r.name,
                  message: c.commit?.message?.split("\n")[0] ?? "",
                  date: c.commit?.author?.date ?? "",
                  url: c.html_url ?? r.html_url,
                }))
            )
          )
        )

        const recentCommits = commitResults
          .flatMap(r => (r.status === "fulfilled" ? r.value : []))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 6)

        if (cancelled) return
        setData({
          publicRepos: profile.public_repos,
          followers: profile.followers,
          totalCommits,
          topRepos,
          languages,
          recentCommits,
          loading: false,
          error: null,
        })
      } catch (e: any) {
        if (cancelled) return
        console.error("[useGithub]", e)
        setData(prev => ({ ...prev, loading: false, error: e.message }))
      }
    }

    fetchAll()
    return () => {
      cancelled = true
    }
  }, [])

  return data
}