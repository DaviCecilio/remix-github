import invariant from "tiny-invariant"
import pick from 'lodash/pick'
import { Types } from "."

const config = {
  headers: {
    accept: "application/vnd.github.v3+json",
    Authorization: `token ${process.env.GITHUB_API_TOKEN}`,
  },
}


export const getGithubUser = async (username?: string): Promise<Types.User> => {
  invariant(username, 'Please provide an username as a string')

  const res = await fetch(`https://api.github.com/users/${username}`, config)

  return pick((await res.json()), ['name', 'login', 'avatar_url', 'html_url', 'bio'])
}

export const getUserRepos = async (username?: string): Promise<Types.Repositories.Repo[]> => {
  invariant(username, 'Please provide an username as a string')

  const res = await fetch(`https://api.github.com/users/${username}/repos`, config)


  return (await res.json()).map((repo: Types.Repositories.Repo) =>
    pick(repo, [
      "id",
      "full_name",
      "stargazers_count",
      "html_url",
      "language",
      "name"
    ])
  )
}

export const getCommits = async (username?: string, reponame?: string): Promise<Types.Repository.Commit[]> => {
  invariant(reponame, 'Please provide an reponame as a string')
  invariant(username, 'Please provide an username as a string')

  const res = await fetch(`https://api.github.com/repos/${username}/${reponame}/commits`, config)


  return (await res.json()).map((commit: Types.Repository.Commit) => ({
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
