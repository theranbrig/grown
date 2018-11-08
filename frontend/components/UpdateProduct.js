import React, { Component } from 'react';
import { Form, Button, Grid, Message, Icon, Select, Label, Input, Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import Link from 'next/link';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import LoggedIn from './LoggedIn';
import Router from 'next/router';
import Error from './ErrorMessage';
import { unitOptions } from '../lib/formData';
import { PRODUCTS_QUERY } from './Store';
import FormStyling from './styles/FormStyles';

const CreateProductStyling = styled.div`
	margin: 0 auto;
	button {
		height: 38px;
		background-color: ${props => props.theme.lightBlue} !important;
		margin-top: 23px !important;
	}

	i {
		font-size: 1rem;
	}
`;

const INDIVIDUAL_PRODUCT_QUERY = gql`
	query INDIVIDUAL_PRODUCT_QUERY($id: ID!) {
		product(where: { id: $id }) {
			id
			name
			price
			image
			description
			unit
			farm {
				id
				name
				user {
					id
				}
			}
		}
	}
`;
const UPDATE_PRODUCT_MUTATION = gql`
	mutation UPDATE_PRODUCT_MUTATION(
		$id: ID!
		$name: String
		$description: String
		$price: Int
		$unit: String
		$farmId: String
		$image: String
	) {
		updateProduct(
			id: $id
			name: $name
			description: $description
			price: $price
			unit: $unit
			farmId: $farmId
			image: $image
		) {
			id
		}
	}
`;

class UpdateProduct extends Component {
	// State for Form
	state = { completed: false };

	// Change info for newly created states
	handleChange = e => {
		const { name, type, value } = e.target;
		this.setState({ [name]: value });
	};

	selectInput = (e, data) => {
		this.setState({ unit: data.value });
	};

	updateProduct = async (e, updateProductMutation) => {
		e.preventDefault();
		console.log(this.state);
		console.log(this.props.id);
		const res = await updateProductMutation({
			variables: {
				id: this.props.id,
				...this.state
			}
		});
		this.setState({ completed: true });
	};

	render() {
		return (
			<FormStyling>
				<Query query={INDIVIDUAL_PRODUCT_QUERY} variables={{ id: this.props.id }}>
					{({ data, error, loading }) => {
						if (loading) return <Loader active inline />;
						if (!data.product) return <p>No Info for product with ID {this.props.id}</p>;
						return (
							<div>
								<h3>
									Edit {data.product.farm.name} - {data.product.name}
								</h3>
								<Link href={`farm?id=${data.product.farm.id}`}>
									<a>Return to {data.product.farm.name}</a>
								</Link>
								<Mutation
									mutation={UPDATE_PRODUCT_MUTATION}
									variables={this.state}
									refetchQueries={[{ query: INDIVIDUAL_PRODUCT_QUERY }]}>
									{(updateProduct, { error, loading }) => {
										if (error) return <Error error={error} />;
										return (
											<Form
												success={this.state.completed}
												method="post"
												loading={loading}
												onSubmit={async e => {
													await this.updateProduct(e, updateProduct);
												}}>
												<Message
													success
													header="UPDATE COMPLETE"
													content="Check over your changes or make new ones if you wish."
												/>
												<Form.Field>
													<label>Product Name</label>
													<input
														type="text"
														name="name"
														id="name"
														placeholder="30 Character Limit"
														maxLength="30"
														defaultValue={data.product.name}
														onChange={this.handleChange}
													/>
												</Form.Field>
												<Form.Field>
													<label>Product Description</label>
													<input
														type="text"
														name="description"
														id="description"
														placeholder="100 Character Limit"
														maxLength="100"
														defaultValue={data.product.description}
														onChange={this.handleChange}
													/>
												</Form.Field>
												<Form.Field>
													<label>Price</label>
													<Input
														textalign="right"
														labelPosition="right"
														type="text"
														name="price"
														id="price"
														placeholder="Whole Dollars"
														maxLength="4">
														<Label basic>$</Label>
														<input
															defaultValue={data.product.price}
															onChange={this.handleChange}
															maxLength="4"
														/>
														<Label>.00</Label>
													</Input>
												</Form.Field>
												<Form.Field
													control={Select}
													options={unitOptions}
													defaultValue={data.product.unit}
													onChange={this.selectInput}
													label={{ children: 'Units', htmlFor: 'unit' }}
													search
													fluid
													searchInput={{ id: 'unit' }}
												/>
												<Button type="submit" icon labelPosition="right">
													Updat
													{loading ? 'ing' : 'e'}
													<Icon name="arrow right" />
												</Button>
												<Message
													success
													header="UPDATE COMPLETE"
													content="Check over your changes or make new ones if you wish."
												/>
											</Form>
										);
									}}
								</Mutation>
							</div>
						);
					}}
				</Query>
			</FormStyling>
		);
	}
}

export default UpdateProduct;
export { INDIVIDUAL_PRODUCT_QUERY };
