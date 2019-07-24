import { githubConstants } from '../constants/github.constants';

export const getAllReposForOrganization = async (orgName: string, 
                                                 sortBy: string, 
                                                 sortOrder: string) => {
    if(orgName && orgName.length) {
        try {
            const possibleExtensions = githubConstants.repoListAPIExtension.replace('{orgName}', orgName)
                                                                   .replace('{sortBy}', sortBy)
                                                                   .replace('{sortOrder}', sortOrder)
            const repoListStatus = await fetch(githubConstants.githubAPIURL + possibleExtensions).catch((error) => {
                return null
            })

            if(repoListStatus && repoListStatus.status === 200) {
                return repoListStatus.json()
            }
        } catch(error) {
            return []
        }
    }

    return []

}