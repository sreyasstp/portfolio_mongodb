import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  ApolloLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import Cookies from 'js-cookie'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  credentials: 'include',
})

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('auth_token') ?? (
    typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  )

  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      if (extensions?.category === 'authentication') {
        Cookies.remove('auth_token')
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }
      console.error(`[GraphQL error]: ${message}`)
    })
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          blogs: {
            keyArgs: ['status', 'featured', 'category_id', 'search'],
            merge(existing, incoming) {
              return incoming
            },
          },
          extensions: {
            keyArgs: ['type', 'featured', 'category_id'],
            merge(existing, incoming) {
              return incoming
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: { fetchPolicy: 'cache-and-network' },
    query: { fetchPolicy: 'network-only', errorPolicy: 'all' },
  },
  devtools: { enabled: process.env.NODE_ENV === 'development' },
})
