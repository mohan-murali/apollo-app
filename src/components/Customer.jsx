import React,  { useState } from 'react';
import CustomerDetail from './CustomerDetail';


const Customer = ( { id, name }) => {
    const [ expandCustomer, setExpandCustomer ] = useState(false);

    const showCustomerData = e => {
        e.preventDefault();
        setExpandCustomer(true);
    }


    return (
        <div className='customer'>
            { !expandCustomer &&
                <div onClick = {showCustomerData}> {name} </div>
            }
            { expandCustomer &&
                <CustomerDetail id={id} />
            }
        </div>
    )
}

export default Customer;