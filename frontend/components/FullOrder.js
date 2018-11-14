import React, { Component } from 'react';
import User from './User';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import styled from 'styled-components';
import { List, Grid, Loader, Segment, Icon, Table } from 'semantic-ui-react';
import { formatDistance } from 'date-fns';
import formatMoney from '../lib/formatMoney';
import { INDIVIDUAL_FARM_QUERY } from './IndividualFarm';

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
		padding: 60px 0;
		font-size: 1.5rem !important;
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
	/* h3 {
		padding: 15px 0 0 15px;
	} */
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
`;

const INDIVIDUAL_ORDER_QUERY = gql`
	query INDIVIDUAL_ORDER_QUERY($id: ID!) {
		order(id: $id) {
			id
			total
			charge
			total
			createdAt
			user {
				id
				name
				email
			}
			items {
				id
				quantity
				name
				price
				farmId
				product {
					farm {
						id
						name
						location
					}
				}
			}
		}
	}
`;

class FullOrder extends Component {
	render() {
		return (
			<Query query={INDIVIDUAL_ORDER_QUERY} variables={{ id: this.props.id }}>
				{({ data, error, loading }) => {
					console.log(data);
					if (error) return <p>Error...</p>;
					if (loading) return <Loader />;
					return (
						<OrdersStyling>
							<div className="order-header">
								<Link href="/orders">
									<a>
										<Icon name="arrow left" />
									</a>
								</Link>
								<h2>{data.order.user.name}'s Order Summary</h2>
								<p>#: {data.order.id}</p>
							</div>
							<Grid centered container>
								<Grid.Column>
									<div className="order-list">
										<Segment className="order-box">
											<Segment.Group className="order-info">
												<Segment>
													<strong>Order #: </strong>
													{data.order.id}
												</Segment>
												<Segment>
													Ordered {formatDistance(data.order.createdAt, new Date())} ago
												</Segment>
												<Segment>
													<strong>Customer:</strong> {data.order.user.name} -{' '}
													{data.order.user.email}
												</Segment>
											</Segment.Group>
											<Segment.Group>
												<Segment className="order-price">
													<Icon name="dollar" />
													<strong>{data.order.total / 100}.00</strong>
												</Segment>
												<Segment>
													<strong>Payment Confirmation #:</strong> {data.order.charge}
												</Segment>
											</Segment.Group>
											<Table className="order-table" padded="very">
												<Table.Header>
													<Table.Row>
														<Table.HeaderCell>Product ID</Table.HeaderCell>
														<Table.HeaderCell>Product</Table.HeaderCell>
														<Table.HeaderCell>Farm</Table.HeaderCell>
														<Table.HeaderCell textAlign="right">Order</Table.HeaderCell>
													</Table.Row>
												</Table.Header>
												<Table.Body>
													{data.order.items.map(item => (
														<Table.Row key={item.id}>
															<Table.Cell collapsing className="item-id">
																{item.id}
															</Table.Cell>
															<Table.Cell collapsing>{item.name}</Table.Cell>
															<Table.Cell collapsing>{item.product.farm.name}</Table.Cell>
															<Table.Cell textAlign="right">
																{item.quantity} &times; {item.price} = ${item.quantity * item.price}
															</Table.Cell>
														</Table.Row>
													))}
												</Table.Body>
											</Table>
										</Segment>
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

export default FullOrder;
