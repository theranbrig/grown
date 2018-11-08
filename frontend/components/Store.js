import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import User from './User';
import UpdateProduct, { INDIVIDUAL_PRODUCT_QUERY } from './UpdateProduct';
import DeleteProductButton from './DeleteProductButton';
import Link from 'next/link';

const StoreStyling = styled.div`
	.ui.table thead th {
		background: ${props => props.theme.regularBlue} !important;
		color: white;
	}
	button {
		background: ${props => props.theme.lightBlue} !important;
		font-size: 1rem;
		width: 90%;
	}
	i {
		font-size: 0.8rem;
	}
	h2 {
		width: 80%;
		text-align: center;
	}
`;

const PRODUCTS_QUERY = gql`
	query PRODUCTS_QUERY($farmId: String) {
		products(where: { farmId: $farmId }) {
			id
			name
			price
			image
			description
			unit
			farm {
				user {
					id
				}
			}
		}
	}
`;

class Store extends Component {
	state = {
		id: null,
		updateProduct: false
	};

	setUpdate = async value => {
		setTimeout(() => {
			this.setState({ updateProduct: true });
		}, 5000);
	};

	render() {
		return (
			<User>
				{({ data: { me } }) => (
					<Query query={PRODUCTS_QUERY} variables={{ farmId: this.props.id }}>
						{({ data, loading, error }) => {
							if (error) return <p>Error...</p>;
							if (data.products.length === 0)
								return (
									<StoreStyling>
										<Table striped stackable>
											<Table.Header>
												<Table.Row>
													<Table.HeaderCell colSpan="6">
														{this.props.name} Store - Add Items to your Cart
													</Table.HeaderCell>
												</Table.Row>
											</Table.Header>
											<Table.Body>
												<Table.Row>
													<Table.Cell collapsing textAlign="center">
														No Products Available for Purchase
													</Table.Cell>
												</Table.Row>
											</Table.Body>
										</Table>
									</StoreStyling>
								);
							return (
								<StoreStyling>
									<h2>Purchase {this.props.name} Products</h2>
									<Table striped stackable>
										<Table.Header>
											<Table.Row>
												<Table.HeaderCell colSpan="6">
													{this.props.name} Store - Add Items to your Cart
												</Table.HeaderCell>
											</Table.Row>
										</Table.Header>
										<Table.Body>
											{data.products.map(product => (
												<Table.Row key={product.id}>
													<Table.Cell width={3}>{product.name}</Table.Cell>
													<Table.Cell width={7}>{product.description}</Table.Cell>
													<Table.Cell width={2}>
														<Icon name="dollar sign" /> {product.price} / {product.unit}
													</Table.Cell>
													<Table.Cell width={2}>
														<Button icon labelPosition="right">
															Add {loading ? 'ing' : ' '}
															<Icon name="cart plus" />
														</Button>
													</Table.Cell>
													{me &&
														me.id === product.farm.user.id && (
															<>
																<Table.Cell textAlign="right" width={1}>
																	<Link
																		href={{
																			pathname: '/updateproduct',
																			query: { id: product.id }
																		}}>
																		<a>
																			<Icon name="edit" />
																		</a>
																	</Link>
																</Table.Cell>
																<Table.Cell textAlign="right" width={1}>
																	<DeleteProductButton id={product.id} />
																</Table.Cell>
															</>
														)}
												</Table.Row>
											))}
										</Table.Body>
									</Table>
								</StoreStyling>
							);
						}}
					</Query>
				)}
			</User>
		);
	}
}

export default Store;
export { PRODUCTS_QUERY };
