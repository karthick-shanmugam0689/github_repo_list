import { IBranchSearchState, IBranch } from '../types/branch.types.d'

export const ACTION_TYPES = {
  SET_BRANCHES_FOR_REPO: 'SET_BRANCHES_FOR_REPO',
  SET_ORG_REPO_NAME: 'SET_ORG_REPO_NAME',
}

export const initialState: IBranchSearchState = {
    branchList: [],
    orgName: '',
    repoName: '',
}

export const reducer = (state: IBranchSearchState = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_BRANCHES_FOR_REPO:
      const branchList = getBranchList(action.branchList, action.orgName, action.repoName)
      return {
        ...state,
        branchList,
        orgName: action.orgName,
        repoName: action.repoName,
      }
    case ACTION_TYPES.SET_ORG_REPO_NAME:
      return {
        ...state,
        orgName: action.orgName,
        repoName: action.repoName,
      }
    default:
      return state
  }
}

const getBranchList = (branchList: any, orgName: any, repoName: any) : IBranch[] => {
    if(branchList && branchList.length) {
        return branchList.map((currentBranch: any) => {
            return {
                branchName: currentBranch.name,
                orgName,
                repoName
            }
        })
    }
    return []
}