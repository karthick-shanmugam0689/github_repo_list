import { githubConstants } from '../constants/github.constants';

export const getAllReposForOrganization = async (orgName: string, 
                                                 sortBy: string, 
                                                 sortOrder: string) => {
    if(orgName && orgName.length) {
        try {
            const possibleExtensions = githubConstants.repoListAPIExtension.replace('{orgName}', orgName)
                                                                   .replace('{sortBy}', sortBy)
                                                                   .replace('{sortOrder}', sortOrder)
            const repoListStatus = await fetch(githubConstants.githubAPIURL + possibleExtensions, {
                headers: new Headers({
                    'Authorization': 'token 41f68dc80248b99a59d70ada33c2eb7336bcc39e',
                })
            }).catch(function(error) {
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