import { githubConstants } from '../constants/github.constants';

export const getAllBranchesForRepo = async (orgName: string, 
                                            repoName: string) => {
    if(orgName && orgName.length && repoName && repoName.length) {
        try {
            const possibleExtensions = githubConstants.branchListAPIExtension.replace('{orgName}', orgName)
                                                                   .replace('{repoName}', repoName)
            const branchListStatus = await fetch(githubConstants.githubAPIURL + possibleExtensions, {
                headers: new Headers({
                    'Authorization': 'token 41f68dc80248b99a59d70ada33c2eb7336bcc39e',
                })
            }).catch(function(error) {
                return null
            })

            if(branchListStatus && branchListStatus.status === 200) {
                return branchListStatus.json()
            }
        } catch(error) {
            return []
        }
    }

    return []

}