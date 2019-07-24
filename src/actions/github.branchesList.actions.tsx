import { githubConstants } from '../constants/github.constants';

export const getAllBranchesForRepo = async (orgName: string, 
                                            repoName: string) => {
    if(orgName && orgName.length && repoName && repoName.length) {
        try {
            const possibleExtensions = githubConstants.branchListAPIExtension.replace('{orgName}', orgName)
                                                                   .replace('{repoName}', repoName)
            const branchListStatus = await fetch(githubConstants.githubAPIURL + possibleExtensions).catch((error) => {
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