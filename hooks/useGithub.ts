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
  totalCommits: number
  topRepos: Repo[]
  languages: { name: string; count: number; color: string }[]
  recentCommits: { repo: string; message: string; date: string; url: string }[]
  loading: boolean
  error: string | null
}

const LANG_COLORS: Record<string, string> = {
  TypeScript:  "#3178C6",
  JavaScript:  "#F7DF1E",
  C:           "#A8B9CC",
  "C++":       "#f34b7d",
  Python:      "#3B82F6",
  HTML:        "#e34c26",
  CSS:         "#563d7c",
}

async function fetchAllRepos(username: string): Promise<Repo[]> {
  const all: Repo[] = []
  let page = 1
  while (true) {
    const res = await fetch(
      `${BASE}/users/${username}/repos?sort=pushed&per_page=100&page=${page}`
    )
    if (!res.ok) break
    const batch: Repo[] = await res.json()
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
    async function fetch_all() {
      try {
        const [profileRes, repos] = await Promise.all([
          fetch(`${BASE}/users/${username}`).then(r => {
            if (!r.ok) throw new Error("Usuário não encontrado")
            return r.json()
          }),
          fetchAllRepos(USERNAME),
        ])

        // Total commits via search API (último ano)
        const commitsRes = await fetch(
          `${BASE}/search/commits?q=author:${USERNAME}&per_page=1`,
          { headers: { Accept: "application/vnd.github.cloak-preview" } }
        )
        const commitsData = commitsRes.ok ? await commitsRes.json() : { total_count: 0 }
        const totalCommits = commitsData.total_count ?? 0

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
            fetch(`${BASE}/repos/${USERNAME}/${r.name}/commits?per_page=2`)
              .then(res => (res.ok ? res.json() : []))
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
          publicRepos: profileRes.public_repos,
          followers: profileRes.followers,
          totalCommits,
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

    const username = USERNAME
    fetch_all()
  }, [])

  return data
}