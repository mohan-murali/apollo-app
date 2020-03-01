import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const GET_CUSTOMER_BY_ID = gql`
    query getCustomerByID($id: Int!){
        getCustomerByID(id: $id){
            id,
            name,
            address,
            branch {
                name
            }
        }
    }
`;

const CustomerDetail = ({id}) => {
    const { data, loading, error } = useQuery( GET_CUSTOMER_BY_ID,
        { variables: { id } },
    );

    if(loading) return <div> ...Loading...</div>
    if(error) return <p>ERROR fetching Customer Data</p>
    if(!data) return <p>Customer with id: {id} not found</p>

    const { getCustomerByID } = data;
    return (
        <div className = 'customer-detail'>
            <span className='branch-detail'>Name:<span className='branch-value'>{getCustomerByID.name}</span></span>
            <span className='branch-detail'>Address:<span className='branch-value'>{getCustomerByID.address}</span></span>
            <span className='branch-detail'>Branch:<span className='branch-value'>{getCustomerByID.branch.name}</span></span>
        </div>
    )
}

export default CustomerDetail;