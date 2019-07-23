import * as React from 'react'
import { reducer, initialState, ACTION_TYPES } from '../../reducers/githubRepoList.reducerHooks';
import { getAllReposForOrganization } from '../../actions/github.repoList.actions';
import TextInput from '../../components/common/TextInput/TextInput';
import ReactTable from 'react-table'
import "react-table/react-table.css"
import { getRepoTableConfiguration } from './constants.OrganizationSearch';
import { Button, Grid } from '@material-ui/core';

import './OrganizationSearch.scss'
import { sortOrderConstants } from '../../constants/generic.constants';
import { IRepo } from '../../types/repo.types.d';
import Switcher from '../../components/common/Switcher/Switcher';
import Selector from '../../components/common/Selector/Selector';

const OrganizationRepoSearch = (props: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState)


    React.useEffect(
        () => {
            const { orgName } = props.match.params
            dispatch({
                type: ACTION_TYPES.SET_ORG,
                initialOrgName: orgName,
                orgName,
            })
        },
        [props.match.params]
    )

    const {orgName, repoList, sortBy, sortOrder, initialOrgName, languages, initialRepoList} = state

    React.useMemo(
        () => {
            const getReposForOrganizationOnUserResponse = async () => {
                const repoList = await getAllReposForOrganization(orgName, sortBy, sortOrder)
                if(repoList && sortBy && sortOrder) {
                    repoList.sort((item1: IRepo, item2: IRepo) => {
                        if(sortOrder === sortOrderConstants.asc) {
                            return item1[sortBy] - item2[sortBy]
                        } else {
                            return item2[sortBy]- item1[sortBy]
                        }
                    })
                }
                dispatch({
                    type: ACTION_TYPES.SET_REPOS_FOR_ORG,
                    repoList,
                })
            }
            getReposForOrganizationOnUserResponse()
        },
        [orgName, sortBy, sortOrder],
    )

    const handleChangeInInputParams = (value: string, apiName: string) => {
        dispatch({
            type: ACTION_TYPES.SET_ORG,
            [apiName]: value,
            orgName,
        })
    }

    const handleChangeInOrgName = () => {
        props.history.push(initialOrgName)
    }

    const handleChangeInSortField = (sortField: string) => {
        dispatch({
            type: ACTION_TYPES.SET_ORG,
            orgName,
            initialOrgName,
            sortBy: sortField,
            sortOrder,
        })
    }

    const handleChangeInSortOrder = (sortDirection: string) => {
        dispatch({
            type: ACTION_TYPES.SET_ORG,
            orgName,
            initialOrgName,
            sortBy,
            sortOrder: sortDirection,
        })
    }

    const handleChangeInLanguage = (language: string) => {
        dispatch({
            type: ACTION_TYPES.SET_REPOS_AFTER_FILTER,
            repoList: (language && initialRepoList.filter((repo:IRepo) => repo.language === language)) || initialRepoList
        })
    }


    return (
        <div className="orgnaization-repo-search">
            <div className="header-title">
                {
                    `Repositories for Organization ${orgName}`
                }
            </div>
            <div className="repo-search">
                <TextInput
                    label="Search Organization"
                    apiName="initialOrgName"
                    value={initialOrgName}
                    onChange={handleChangeInInputParams}
                    className="search-box"
                />
                {
                    initialOrgName && (
                        <Button variant="contained" color="primary" onClick={handleChangeInOrgName} className="search-button">
                            GO
                        </Button>
                    )
                }
            </div>
            <div className="repo-settings">
                <Grid container spacing={3}>
                    <Grid item xs={3} className="header">
                        Sort By
                    </Grid>
                    <Grid item xs={3}>
                        <Switcher 
                            switchOption1="stargazers_count" 
                            switchOption2="forks_count"
                            switchOption1Label="STARS"
                            switchOption2Label="FORKS"
                            handleChange={handleChangeInSortField}
                        />
                    </Grid>
                    <Grid item xs={3} className="header">
                        Sort Order
                    </Grid>
                    <Grid item xs={3}>
                        <Switcher 
                            switchOption1={sortOrderConstants.desc} 
                            switchOption2={sortOrderConstants.asc}
                            switchOption1Label="DESC"
                            switchOption2Label="ASC"
                            handleChange={handleChangeInSortOrder}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Selector
                            options={languages}
                            label="Languages"
                            id="prog-language"
                            handleChange={handleChangeInLanguage}
                            cssClass="language-filter"
                        />
                    </Grid>
                </Grid>
            </div>
            <div className="repo-list">
                {
                    repoList && repoList.length > 0 && (
                        <ReactTable
                            key={repoList.length}
                            showPagination={false}
                            defaultPageSize={repoList.length}
                            data={repoList}
                            columns={getRepoTableConfiguration(orgName)}
                            className="-striped -highlight"
                            showPageSizeOptions={false}
                            sortable={false}
                            resizable={false}
                        />
                    )
                }
                {
                    (!repoList || !repoList.length) && orgName && (
                        `No repos found for organization ${orgName}`
                    )
                }
            </div>
        </div>
    )
}

export default OrganizationRepoSearch