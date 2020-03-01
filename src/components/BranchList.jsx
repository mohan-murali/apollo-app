import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Branch from './Branch';

export const BRANCHES = gql`
    query branchDetails {
        getAllBranches {
            id
            name
            address
            customers {
            id
            name
            }

        }
    }
`;

const BranchList = () => {
    const { loading, error, data } = useQuery(BRANCHES);

    if(loading) return <p>Loading...</p>;
    if(error) {
        console.log(error);
        return <p>Error :( </p>;
    }

    return data.getAllBranches.map((x) => (
        <Branch
        key={x.id}
        {...x} />
    ))
}

export default BranchList;