import React from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { adopt } from 'react-adopt';
import User from './User';
import CartStyles from './styles/CartStyles';
import SignOut from './SignOut';
import { Button, Icon, Segment, List, Label } from 'semantic-ui-react';
import calcTotalPrice from '../lib/calcTotalPrice';
import Link from 'next/link';
import BuyMe from './BuyMe';
import RemoveProduct from './RemoveCartProduct';
import AddToCart from './AddToCart';
import AddAnother from './AddAnother';
import RemoveOne from './RemoveOne';

const LOCAL_STATE_QUERY = gql`
	query {
		cartOpen @client
	}
`;

const TOGGLE_CART_MUTATION = gql`
	mutation {
		toggleCart @client
	}
`;
/* eslint-disable */
const Composed = adopt({
	user: ({ render }) => <User>{render}</User>,
	toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
	localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});
/* eslint-enable */

const Cart = () => (
	<Composed>
		{({ user, toggleCart, localState }) => {
			const me = user.data.me;
			if (!me) return null;
			return (
				<CartStyles open={localState.data.cartOpen}>
					<header>
						<Button icon onClick={toggleCart}>
							<Icon name="delete" />
						</Button>
						<h2>{me.name}'s Cart</h2>
						<p>
							You have <strong>{me.cart.length}</strong> item{me.cart.length === 1 ? '' : 's'} in
							your cart.
						</p>
					</header>
					<List animated divided>
						{me.cart.map(cartProduct => (
							<List.Item key={cartProduct.id}>
								<List.Header>
									<Link href={`/farm?id=${cartProduct.product.farm.id}`}>
										<a>{cartProduct.product.name}</a>
									</Link>
								</List.Header>
								<List.Description>{cartProduct.product.farm.name}</List.Description>
								<p>
									${cartProduct.product.price} &times; {cartProduct.quantity}{' '}
									{cartProduct.product.unit}
									{cartProduct.quantity === 1 ? '' : 's'} ={' '}
									<strong>
										${cartProduct.product.price * cartProduct.quantity}
										.00
									</strong>
								</p>
								<div className="cart-item-buttons">
									<RemoveOne id={cartProduct.product.id} />
									<AddAnother id={cartProduct.product.id} />
									<RemoveProduct id={cartProduct.id} />
								</div>
							</List.Item>
						))}
					</List>
					<footer>
						<h3>
							Total: $
							{me.cart.reduce((tally, cartProduct) => {
								if (!cartProduct.product) return tally;
								return tally + cartProduct.quantity * cartProduct.product.price;
							}, 0)}
						</h3>
					</footer>
					<BuyMe />
					<SignOut />
				</CartStyles>
			);
		}}
	</Composed>
);

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
