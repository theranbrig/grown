import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import { Button, Icon } from 'semantic-ui-react';

const ADD_TO_CART_MUTATION = gql`
	mutation addToCart($id: ID!) {
		addToCart(id: $id) {
			id
			quantity
		}
	}
`;

class AddToCart extends React.Component {
	render() {
		const { id } = this.props;
		return (
			<Mutation
				mutation={ADD_TO_CART_MUTATION}
				variables={{
					id
				}}
				refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
				{(addToCart, { loading }) => (
					<Button icon labelPosition="right" disabled={loading} onClick={addToCart}>
						Add {loading ? 'ing' : ' '}
						<Icon name="cart plus" />
					</Button>
				)}
			</Mutation>
		);
	}
}
export default AddToCart;
export { ADD_TO_CART_MUTATION };
