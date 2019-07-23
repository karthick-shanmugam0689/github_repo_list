import { IOrganizationRepoSearchState, IRepo } from '../types/repo.types.d';
import {sortOrderConstants} from '../constants/generic.constants'

export const ACTION_TYPES = {
  SET_ORG: 'SET_ORG',
  SET_REPOS_FOR_ORG: 'SET_REPOS_FOR_ORG',
  SET_REPOS_AFTER_FILTER: 'SET_REPOS_AFTER_FILTER',
}

export const initialState: IOrganizationRepoSearchState = {
  repoList: [],
  initialRepoList: [],
  orgName: '',
  initialOrgName: '',
  sortBy: 'stargazers_count',
  languages: [],
  sortOrder: sortOrderConstants.desc
}

export const reducer = (state: IOrganizationRepoSearchState = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ORG:
      return {
        ...state,
        initialOrgName: action.initialOrgName,
        orgName: action.orgName,
        sortBy: action.sortBy || state.sortBy,
        sortOrder: action.sortOrder || state.sortOrder,
      }
    case ACTION_TYPES.SET_REPOS_FOR_ORG:
      const repoList = getFormattedRepoList(action.repoList)
      const languages = getLanguages(repoList)
      return {
        ...state,
        repoList,
        initialRepoList: repoList.slice(0),
        languages,
      }
    case ACTION_TYPES.SET_REPOS_AFTER_FILTER:
        return {
          ...state,
          repoList: action.repoList,
        }
    default:
      return state
  }
}

const getFormattedRepoList = (repoList: any) : IRepo[] => {
  if(repoList && repoList.length) {
    return repoList.map((repo: any) => {
      return {
        repoName: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks,
        language: repo.language,
      }
    })
  } else {
    return []
  }
}

const getLanguages = (repoList: IRepo[]) : any[] => {
  if(repoList && repoList.length) {
    const languages: any = []
    repoList.forEach((repo: IRepo) => {
      if(repo.language && !languages.includes(repo.language)) {
        languages.push(repo.language)
      }
    })

    if(languages && languages.length) {
      return languages.map((language: string) => {
        return {
          key: language,
          value: language
        }
      })
    }
  }
  return []
}