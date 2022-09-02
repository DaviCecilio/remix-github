export interface User {
  name: string
  login: string
  avatar_url: string
  html_url: string
  bio: string
}

export namespace Repositories {
  export interface Repo {
    id: number
    full_name: string
    stargazers_count: number
    html_url: string
    language: string
    name: string
  }


  export interface LoaderDataProps {
    user: User
    repos: Repo[]
  }
}

export namespace Repository {
  interface Author {
    login: string
    id: number
    node_id: string
    avatar_url: string
    html_url: string
  }

  export interface Commit {
    sha: string
    author: Author
  }

  export interface LoaderDataProps {
    commits: Commit[]
  }
}



