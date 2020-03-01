import React, {useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation loginUser($userName: String!, $password: String!){
        loginUser(userName: $userName, password: $password) @client
    }
`;

const Login = ({refetch}) => {
    const [userName, setUserName ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ login ] = useMutation(
            LOGIN_USER ,
        );
    const onLoginClick = () => {
        login({ variables: { userName, password }});
        refetch();
    }
    return (
    <div className = 'div-login'>
        <label>User Name</label>
        <input type='text' id='inp-username'
        value={userName}
        className ='inp-login' placeholder='enter your username'
        onChange= {e => setUserName(e.target.value)}/>
        <label>Password</label>
        <input type='password' id='inp-password'
        value={password}
        className='inp-login' placeholder='enter your password'
        onChange={e => setPassword(e.target.value)}/>
        <button className='btn-login' onClick={onLoginClick}>Login</button>
    </div>);
}

export default Login;