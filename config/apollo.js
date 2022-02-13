import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/'
});

const authTokenLink = setContext((_, { headers }) => {

    // Leer el storage almacenado
    const token = localStorage.getItem('token');

    return {
        headers: {
            ...headers,
            authotization: token ? `Bearer ${token}` : ''
            // miPropioHeader: 'Hola mi header!!'
        }
    }
})

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authTokenLink.concat(httpLink)
});

export default client;