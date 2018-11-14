import React, { Component } from 'react';
import User from './User';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
import { List, Grid, Loader, Segment, Icon } from 'semantic-ui-react';
import { formatDistance } from 'date-fns';
import formatMoney from '../lib/formatMoney';

const OrdersStyling = styled.div`
	min-height: 600px;
	.order-header {
		background-color: ${props => props.theme.lightBlue};
		border-bottom: 2px solid ${props => props.theme.orange};
		text-align: center;
		padding: 40px 0;
		width: 100%;
		font-size: 1.3rem;
	}
	h2 {
		text-align: center;
		padding: 15px 0;
		font-family: 'Michroma', sans-serif;
		letter-spacing: 0.1rem;
		width: 50%;
		margin: 0 auto;
	}
	span {
		color: ${props => props.theme.darkBlue};
	}
	.order-list {
		padding-top: 40px;
	}
	a {
		color: ${props => props.theme.black};
	}
	i {
		font-size: 1.5rem;
		padding-right: 5px;
		margin-right: 10px;
		color: ${props => props.theme.orange};
	}
	.list-icon {
		width: 50px;
		margin-right: 10px;
	}
	div.ui.segment {
		font-size: 1.25rem;
	}
	.item-id {
		font-size: 0.8rem;
	}
	.order-box {
		background: ${props => props.theme.darkBlue};
	}
	.ui.segment.order-price {
		font-size: 2rem;
	}
	th {
		background: ${props => props.theme.lightBlue} !important;
	}
	strong {
		color: ${props => props.theme.darkBlue};
	}
	h3 {
		color: ${props => props.theme.orange};
	}
`;

const USER_ORDERS_QUERY = gql`
	query USER_ORDERS_QUERY {
		orders(orderBy: createdAt_DESC) {
			id
			total
			createdAt
			user {
				id
				name
			}
			items {
				id
				quantity
				name
			}
		}
	}
`;
class Orders extends Component {
	render() {
		return (
			<Query query={USER_ORDERS_QUERY}>
				{({ data: { orders }, loading, error }) => {
					console.log(orders);
					if (loading) return <Loader />;
					if (error) return <p>Error</p>;
					return (
						<OrdersStyling>
							<div className="order-header">
								<h2>
									Review Recent <span>GROWN</span> Orders
								</h2>
							</div>
							<Grid centered container>
								<Grid.Column>
									<div className="order-list">
										<List divided relaxed>
											{orders.map(order => (
												<Segment textAlign="left" className="order-box">
													<Link
														href={{
															pathname: '/order',
															query: { id: order.id }
														}}>
														<a>
															<Segment.Group>
																<Segment>
																	<Icon name="paperclip" />
																	{order.id}
																</Segment>
																<Segment className="order-price">
																	<Icon name="dollar" />
																	{order.total / 100}.00
																</Segment>
															</Segment.Group>
															<Segment.Group horizontal>
																<Segment secondary>
																	<Icon name="dot circle outline" />
																	{order.items.reduce((a, b) => a + b.quantity, 0)} Total Items
																</Segment>
																<Segment secondary>
																	<Icon name="calendar alternate outline" />
																	Ordered {formatDistance(order.createdAt, new Date())}
																</Segment>
															</Segment.Group>
															<Segment.Group>
																<h3>
																	<Icon name="list" className="list-icon" />
																	Order Summary
																</h3>
																{order.items.map(item => (
																	<Segment>{item.name}</Segment>
																))}
															</Segment.Group>
														</a>
													</Link>
												</Segment>
											))}
										</List>
									</div>
								</Grid.Column>
							</Grid>
						</OrdersStyling>
					);
				}}
			</Query>
		);
	}
}

export default Orders;
