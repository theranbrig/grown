import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import User from './User';

const StoreStyling = styled.div`
	.ui.table thead th {
		background: ${props => props.theme.regularBlue} !important;
		color: white;
	}
	button {
		background: ${props => props.theme.lightBlue} !important;
		font-size: 1rem;
	}
	i {
		font-size: 1rem;
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
	render() {
		return (
			<User>
				{({ data: { me } }) => (
					<StoreStyling>
						<h2>Purchase {this.props.name} Products</h2>
						<Table striped stackable>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell colSpan="5">
										{this.props.name} Store - Add Items to your Cart
									</Table.HeaderCell>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								<Query query={PRODUCTS_QUERY} variables={{ farmId: this.props.id }}>
									{({ data, loading, error }) => {
										if (error) return <p>Error...</p>;
										if (data.products.length === 0)
											return (
												<Table.Row>
													<Table.Cell collapsing textAlign="center">
														No Products Available for Purchase
													</Table.Cell>
												</Table.Row>
											);
										return data.products.map(product => (
											<Table.Row>
												<Table.Cell width={4}>{product.name}</Table.Cell>
												<Table.Cell width={8}>{product.description}</Table.Cell>
												<Table.Cell width={2}>
													<Icon name="dollar sign" /> {product.price} / {product.unit}
												</Table.Cell>
												<Table.Cell width={2}>
													<Button type="submit" icon labelPosition="right">
														Add
														{loading ? 'ing' : ''}
														<Icon name="shopping basket" />
													</Button>
												</Table.Cell>
												{me &&
													me.id === product.farm.user.id && (
														<Table.Cell textAlign="right" width={1}>
															<Icon name="delete" />
															<Icon name="edit" />
														</Table.Cell>
													)}
											</Table.Row>
										));
									}}
								</Query>
							</Table.Body>
						</Table>
					</StoreStyling>
				)}
			</User>
		);
	}
}

export default Store;
export { PRODUCTS_QUERY };
