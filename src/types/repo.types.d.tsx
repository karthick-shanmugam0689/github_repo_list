export interface IRepo {
    repoName: string
    stars: number
    forks: number
    language: string
}

export interface IOrganizationRepoSearchState {
    repoList: IRepo[]
    initialRepoList: IRepo[],
    orgName: string
    initialOrgName: string
    sortBy: string
    sortOrder: string
    languages: any[]
}