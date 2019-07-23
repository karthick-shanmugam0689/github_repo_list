export interface IBranch {
    branchName: string
    orgName: string
    repoName: string
}

export interface IBranchSearchState {
    branchList: IBranch[]
    orgName: string
    repoName: string
}