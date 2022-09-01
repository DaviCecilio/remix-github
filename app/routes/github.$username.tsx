import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { GithubContainer, LoaderDataProps, GithubApi } from "~/features/github"

export const loader: LoaderFunction = async ({ params }) => {
  return {
    user: await GithubApi.getGithubUser(params.username),
    repos: await GithubApi.getUserRepos(params.username),
  }
}

export function ErrorBoundary() {
  return <h3>Whoops!!!</h3>
}

export default function () {
  const { user, repos } = useLoaderData<LoaderDataProps>()

  return <GithubContainer user={user} repos={repos} />
}
