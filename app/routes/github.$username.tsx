import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { GithubContainer, LoaderDataProps, GithubApi } from "~/features/github"

export const loader: LoaderFunction = async ({ params }) => {
  const user = await GithubApi.getGithubUser(params.username)

  return {
    user,
  }
}

export function ErrorBoundary() {
  return <h3>Whoops!!!</h3>
}

export default function () {
  const { user } = useLoaderData<LoaderDataProps>()

  return <GithubContainer user={user} />
}
