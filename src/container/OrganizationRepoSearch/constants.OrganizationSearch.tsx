import * as React from 'react'
import { Link } from '@material-ui/core';

export const getRepoTableConfiguration = (orgName: string) => {
    return [
        {
            Header: 'Repo Name',
            accessor: 'repoName',
            Cell: (props: any) => {
                const {value, original} = props
                return (
                    <Link href={`#/branch/${orgName}/${original.repoName}`}>
                        {value}
                    </Link>
                )
            }
        },
        {
            Header: 'Stars',
            accessor: 'stars',
        },
        {
            Header: 'Forks',
            accessor: 'forks',
        },
        {
            Header: 'Language',
            accessor: 'language',
        }
    ]
}