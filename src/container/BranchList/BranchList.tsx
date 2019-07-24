import * as React from 'react'
import { reducer, initialState, ACTION_TYPES } from '../../reducers/githubBranchesList.reducerHooks';
import { getAllBranchesForRepo } from '../../actions/github.branchesList.actions';
import ReactTable from 'react-table'
import "react-table/react-table.css"
import { branchListConfiguration } from './constants.BranchList';

const OrganizationRepoSearch = (props: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)


    React.useEffect(
        () => {
            const { orgName, repoName } = props.match.params
            dispatch({
                type: ACTION_TYPES.SET_ORG_REPO_NAME,
                orgName,
                repoName,
            })
        },
        [props.match.params]
    )

    const {branchList, orgName, repoName} = state

    React.useMemo(
        () => {
            const getAllBranchesForRepoFromUI = async () => {
                const branchList = await getAllBranchesForRepo(orgName, repoName)
                
                dispatch({
                    type: ACTION_TYPES.SET_BRANCHES_FOR_REPO,
                    branchList,
                    orgName,
                    repoName,
                })
            }
            getAllBranchesForRepoFromUI()
        },
        [orgName, repoName],
    )


    return (
        <div className="orgnaization-repo-search">
            <div className="header-title">
                {
                    orgName && repoName && (
                        `Branches for Organization ${orgName} for Repo ${repoName}`
                    )
                }
            </div>
            <div className="repo-list">
                {
                    branchList && branchList.length > 0 && (
                        <ReactTable
                            key={branchList.length}
                            showPagination={false}
                            defaultPageSize={branchList.length}
                            data={branchList}
                            columns={branchListConfiguration}
                            className="-striped -highlight"
                            showPageSizeOptions={false}
                            sortable={false}
                            resizable={false}
                        />
                    )
                }
                {
                    (!branchList || !branchList.length) && orgName && repoName && (
                        `No repos found for organization ${orgName} and repo ${repoName}`
                    )
                }
            </div>
        </div>
    )
}

export default OrganizationRepoSearch