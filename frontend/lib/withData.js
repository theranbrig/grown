import ApolloClient from 'apollo-boost';
import withApollo from 'next-with-apollo';
import { endpoint, prodEndpoint } from '../config';

function createClient({ headers }) {
	// Set up apollo clietn
	return new ApolloClient({
		uri: process.env.NODE_ENV === 'development' ? endpoint : "https://grown-production-application.herokuapp.com/grown-production/prod",
		request: operation => {
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
