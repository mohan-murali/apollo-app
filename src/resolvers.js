
import gql from 'graphql-tag';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();

const typeDefs = gql`
  extend type Query {
    isLoggedIn: Boolean!
  }
`;

const link = new HttpLink({
  uri: 'http://localhost:4000/graphql'
});

const resolvers = {
    Mutation : {
        loginUser: (_, { userName, password }, { cache }) => {
            if(userName === 'username' && password === 'password'){
                cache.writeData({ data: { isLoggedIn: true }});
            }
        }
    }
}

export const client = new ApolloClient({
    cache,
    link,
    typeDefs,
    resolvers
});

cache.writeData({
  data:{
    isLoggedIn: false
  }
})