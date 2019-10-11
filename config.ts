import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client: ApolloClient<InMemoryCache> = new ApolloClient({
    uri: 'http://192.168.2.163:8080/v1/graphql',
    cache: new InMemoryCache()
  });


export default client