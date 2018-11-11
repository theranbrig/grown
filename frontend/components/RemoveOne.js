import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import { Button, Icon } from 'semantic-ui-react';

const REMOVE_ONE_MUTATION = gql`
	mutation addToCart($id: ID!) {
		removeOneFromCart(id: $id) {
			id
			quantity
		}
	}
`;

class RemoveOne extends React.Component {
	render() {
		return (
			<Mutation
				mutation={REMOVE_ONE_MUTATION}
				variables={{
					id: this.props.id
				}}
				refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
				{(addToCart, { loading }) => (
					<Button icon disabled={loading} onClick={addToCart}>
						<Icon name="minus" />
					</Button>
				)}
			</Mutation>
		);
	}
}
export default RemoveOne;
