import invariant from "tiny-invariant"
import { Commit, Repo, User } from "./types"

const config = {
  headers: {
    accept: "application/vnd.github.v3+json",
    Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
  },
}


export const getGithubUser = async (username?: string): Promise<User> => {
  invariant(username, 'Please provide an username as a string')

  const res = await fetch(`https://api.github.com/users/${username}`, config)

  const { name, login, avatar_url, html_url, bio } = await res.json()

  return {
    name,
    login,
    avatar_url,
    html_url,
    bio,
  }
}

export const getUserRepos = async (username?: string): Promise<Repo[]> => {
  invariant(username, 'Please provide an username as a string')

  const res = await fetch(`https://api.github.com/users/${username}/repos`, config)


  return (await res.json()).map((repo: Repo) => ({
    id: repo.id,
    full_name: repo.full_name,
    stargazers_count: repo.stargazers_count,
    html_url: repo.html_url,
    language: repo.language,
    name: repo.name
  }))
}

export const getCommits = async (username?: string, reponame?: string): Promise<Commit[]> => {
  invariant(reponame, 'Please provide an reponame as a string')

  const res = await fetch(`https://api.github.com/repos/${username}/${reponame}/commits`, config)


  return (await res.json()).map((commit: Commit) => ({
    sha: commit.sha,

    author: {
      id: commit?.author?.id,
      login: commit?.author?.login,
      node_id: commit?.author?.node_id,
      avatar_url: commit?.author?.avatar_url,
      html_url: commit?.author?.html_url,
    }
  }))
}
