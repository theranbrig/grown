import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import { Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const REMOVE_CART_PRODUCT_MUTATION = gql`
	mutation REMOVE_CART_PRODUCT_MUTATION($id: ID!) {
		removeFromCart(id: $id) {
			id
		}
	}
`;

class RemoveProduct extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired
	};

	update = (cache, payload) => {
		const data = cache.readQuery({ query: CURRENT_USER_QUERY });
		const cartProductId = payload.data.removeFromCart.id;
		data.me.cart = data.me.cart.filter(cartProduct => cartProduct.id !== cartProductId);
		cache.writeQuery({ query: CURRENT_USER_QUERY, data });
	};

	render() {
		return (
			<Mutation
				mutation={REMOVE_CART_PRODUCT_MUTATION}
				variables={{ id: this.props.id }}
				update={this.update}
				optimisticResponse={{
					__typename: 'Mutation',
					removeFromCart: {
						__typename: 'CartProduct',
						id: this.props.id
					}
				}}>
				{(removeFromCart, { error, loading }) => (
					<Button
						disabled={loading}
						icon
						onClick={() => {
							if (confirm('Are you sure you want to delete this product from your cart?')) {
								removeFromCart().catch(err => alert(err.message));
							}
						}}>
						<Icon name="close" />
					</Button>
				)}
			</Mutation>
		);
	}
}

export default RemoveProduct;
