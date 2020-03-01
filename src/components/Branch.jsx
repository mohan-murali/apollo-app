import React, { Fragment, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Customer from './Customer';
import { BRANCHES } from './BranchList';
import { GET_CUSTOMER_BY_ID } from './CustomerDetail';

const CREATE_CUSTOMER = gql`
    mutation createCustomer($name: String!, $address: String!, $branchId: Int!) {
        createCustomer(name: $name, address: $address, branchId: $branchId) {
            id,
            name,
            address,
            branch {
                name,
            }
        }
    }
`;

const Branch = props => {
    const [showCustomer, setShowCustomer] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('')
    const toggle = () => setShowCustomer(!showCustomer);

    const onNameChange = e => setName(e.target.value);
    const onAddressChange = e => setAddress(e.target.value);

    const [ createCustomer ] = useMutation(
        CREATE_CUSTOMER,
        {
            refetchQueries: ({ data }) => {
               return  [{ query: BRANCHES },
                 { query: GET_CUSTOMER_BY_ID,  variables: { id: data.createCustomer.id }} ]
            },
            awaitRefetchQueries: true,
        }
    );

    const onCreate = e => {
        e.preventDefault();
        createCustomer({ variables : { name, address, branchId: props.id }});
        setName('');
        setAddress('');
    }

    return (
        <div className='branch'>
            <div className='branch-list' onClick = {toggle}>
                <span className='branch-detail'>Name : <span className='branch-value'> {props.name}</span></span>
                <span className='branch-detail'>address : <span className = 'branch-value'>{props.address}</span></span>
            </div>
            { showCustomer &&
                <div className='customer-details'>
                    <span>Customer List</span>
                    <div className='customer-list'>
                    {
                        props.customers.map(x=> (
                            <Customer {...x} />
                        ))
                    }
                    </div>
                    <div className='new-customer'>
                        <label>Name</label>
                        <input className='inp-login' type='text' onChange = {onNameChange} value={name} />
                        <label>Address</label>
                        <input className='inp-login' type='text' onChange= {onAddressChange} value = {address} />
                        <button className='btn-add' onClick = {onCreate} >Create New Customer</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Branch;