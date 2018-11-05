import ApolloBoostClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';

function createClient({ headers }) {
	// Set up apollo client
	return new ApolloBoostClient({
		cache: new InMemoryCache(),
		uri: process.env.NODE_ENV === 'development' ? endpoint : prodEndpoint,
		request: async operation => {
			operation.setContext({
				fetchOptions: {
					credentials: 'include'
				},
				headers
			});
		},
		// Local Data
		clientState: {
			resolvers: {}
		}
	});
}

export default withApollo(createClient);
