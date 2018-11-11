import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import { Button, Icon } from 'semantic-ui-react';
import { ADD_TO_CART_MUTATION } from './AddToCart';

class AddAnother extends React.Component {
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
					<Button icon disabled={loading} onClick={addToCart}>
						<Icon name="plus" />
					</Button>
				)}
			</Mutation>
		);
	}
}
export default AddAnother;
