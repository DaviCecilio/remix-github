import { LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Types } from "~/features/github"
import { GithubApi } from "~/features/github"

export const loader: LoaderFunction = async ({ params }) => {
  const { username, reponame } = params

  return {
    commits: await GithubApi.getCommits(username, reponame),
  }
}

export default function () {
  const { commits } = useLoaderData<Types.Repository.LoaderDataProps>()

  return (
    <div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0">
      <div className="pl-6 lg:w-80">
        <div className="pt-6 pb-2">
          <h2 className="text-sm font-semibold">Activity</h2>
        </div>
        <div>
          <ul role="list" className="divide-y divide-gray-200">
            {commits.map((commit) => (
              <li key={commit.sha} className="py-4">
                <div className="flex space-x-3">
                  <img
                    className="h-6 w-6 rounded-full"
                    src={commit.author?.avatar_url}
                    alt={commit.author?.login}
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">{}</h3>
                      <p className="text-sm text-gray-500">
                        {commit.author?.login}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">Deployed</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="py-4 text-sm border-t border-gray-200">
            <a
              href="#"
              className="text-indigo-600 font-semibold hover:text-indigo-900"
            >
              View all activity <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
