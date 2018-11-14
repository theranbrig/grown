import React, { Component } from 'react';
import User, { CURRENT_USER_QUERY } from './User';
import gql from 'graphql-tag';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import { Mutation, Query } from 'react-apollo';
import NProgress from 'nprogress';

const CREATE_ORDER_MUTATION = gql`
	mutation createOrder($token: String!) {
		createOrder(token: $token) {
			id
			charge
			total
			items {
				id
				name
			}
		}
	}
`;

function totalItems(cart) {
	return cart.reduce((tally, cartProduct) => tally + cartProduct.quantity * 100, 0);
}

class SubmitPayment extends Component {
	onToken = async (res, createOrder) => {
		NProgress.start();
		// manually call the mutation once we have the stripe token
		const order = await createOrder({
			variables: {
				token: res.id
			}
		}).catch(err => {
			alert(err.message);
		});
		Router.push({
			pathname: '/browse'
		});
	};
	render() {
		return (
			<div>
				<User>
					{({ data: { me }, loading }) => {
						if (!me) return null;
						if (loading) return null;
						return (
							<Mutation
								mutation={CREATE_ORDER_MUTATION}
								refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
								{createOrder => (
									<StripeCheckout
										amount={me.cart.reduce((tally, cartProduct) => {
											return tally + cartProduct.quantity * cartProduct.product.price * 100;
										}, 0)}
										name="GROWN FARMS"
										description="GROWN FARMS Pre-Order"
										stripeKey="pk_test_lbxXvcYXX2J1PsUyFw9bIPT7"
										currency="USD"
										email={me.email}
										token={res => this.onToken(res, createOrder)}>
										{this.props.children}
									</StripeCheckout>
								)}
							</Mutation>
						);
					}}
				</User>
			</div>
		);
	}
}

export default SubmitPayment;
