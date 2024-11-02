import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: '/api/graphql',  // This path still works with the new location
  cache: new InMemoryCache(),
});