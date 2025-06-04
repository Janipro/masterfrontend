import { ApolloClient, InMemoryCache } from '@apollo/client';
import { backendUrl } from './config';
const client = new ApolloClient({
  //uri: 'http://localhost:6001/graphql', When running local backend
  uri: `${backendUrl}/graphql`,
  cache: new InMemoryCache(),
});
export default client;
