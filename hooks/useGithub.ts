"use client"

import { useEffect, useState } from "react"

const USERNAME = "PauloVictoSantos"
const BASE = "https://api.github.com"

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
  topRepos: Repo[]
  languages: { name: string; count: number; color: string }[]
  recentCommits: { repo: string; message: string; date: string; url: string }[]
  loading: boolean
  error: string | null
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  C:          "#A8B9CC",
  "C++":      "#f34b7d",
  Python:     "#3B82F6",
  HTML:       "#e34c26",
  CSS:        "#563d7c",
  Shell:      "#89e051",
}

export function useGithub(): GithubData {
  const [data, setData] = useState<GithubData>({
    publicRepos: 0,
    followers: 0,
    topRepos: [],
    languages: [],
    recentCommits: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    async function fetch_all() {
      try {
        // 1. Perfil
        const profileRes = await fetch(`${BASE}/users/${USERNAME}`)
        if (!profileRes.ok) throw new Error("Usuário não encontrado")
        const profile = await profileRes.json()

        // 2. Repos (ordenados por push recente, pega 30)
        const reposRes = await fetch(
          `${BASE}/users/${USERNAME}/repos?sort=pushed&per_page=30`
        )
        const repos: Repo[] = await reposRes.json()

        // Top repos por estrelas
        const topRepos = [...repos]
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 5)

        // 3. Linguagens: conta por repo
        const langMap: Record<string, number> = {}
        repos.forEach(r => {
          if (r.language) langMap[r.language] = (langMap[r.language] ?? 0) + 1
        })
        const languages = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({
            name,
            count,
            color: LANG_COLORS[name] ?? "#888",
          }))

        // 4. Commits recentes: busca nos 5 repos com push mais recente
        const recentRepos = [...repos]
          .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())
          .slice(0, 5)

        const commitResults = await Promise.allSettled(
          recentRepos.map(r =>
            fetch(`${BASE}/repos/${USERNAME}/${r.name}/commits?per_page=2`)
              .then(res => res.ok ? res.json() : [])
              .then((commits: any[]) =>
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

        setData({
          publicRepos: profile.public_repos,
          followers: profile.followers,
          topRepos,
          languages,
          recentCommits,
          loading: false,
          error: null,
        })
      } catch (e: any) {
        setData(prev => ({ ...prev, loading: false, error: e.message }))
      }
    }

    fetch_all()
  }, [])

  return data
}