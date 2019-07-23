import * as React from 'react'
import { Link } from '@material-ui/core';

export const branchListConfiguration = [
    {
        Header: 'Branch Name',
        accessor: 'branchName',
    },
    {
        Header: 'Org Name',
        accessor: 'orgName',
        Cell: (props: any) => {
            const {value} = props
            return (
                <Link href={`#/org/${value}`}>
                    {value}
                </Link>
            )
        }
    },
    {
        Header: 'Repo Name',
        accessor: 'repoName',
    },
]