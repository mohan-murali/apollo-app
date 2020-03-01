import React from 'react';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import './App.css';
import BranchList from './components/BranchList';
import Login from './components/Login';
import { client } from './resolvers';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

const IsLoggedIn = () => {
  const { data, refetch } = useQuery(IS_LOGGED_IN);
  return data.isLoggedIn ?
    <div className='main'><BranchList/></div> :
    <Login refetch={refetch}/>
}

const App = () => (
  <ApolloProvider client={client}>
      <IsLoggedIn />
  </ApolloProvider>
);

export default App;
