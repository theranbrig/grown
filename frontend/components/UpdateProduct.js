import React, { Component } from 'react';
import { Form, Button, Grid, Message, Icon, Select, Label, Input } from 'semantic-ui-react';
import styled from 'styled-components';
import Link from 'next/link';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import LoggedIn from './LoggedIn';
import Router from 'next/router';
import Error from './ErrorMessage';
import { unitOptions } from '../lib/formData';
import { PRODUCTS_QUERY } from './Store';

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
				user {
					id
				}
			}
		}
	}
`;
const UPDATE_PRODUCT_MUTATION = gql`
	mutation UPDATE_PRODUCT_MUTATION(
		$name: String!
		$description: String!
		$price: Int!
		$unit: String
		$farmId: String
		$image: String
	) {
		createProduct(
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
	state = {};

	// Enter Information Value Handler
	saveToState = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	selectInput = (e, data) => {
		this.setState({ unit: data.value });
	};

	render() {
		return (
			<Query query={INDIVIDUAL_PRODUCT_QUERY} variables={this.props.id}>
				{({ data, error, loading }) => {
					console.log(data);
					return (
						<CreateProductStyling>
							<h3>Edit {this.props.id}</h3>
							<Form method="post">
								<Form.Group>
									<Form.Field width={4}>
										<label>Product Name</label>
										<input
											type="text"
											name="name"
											id="name"
											placeholder="30 Character Limit"
											maxLength="30"
											value={this.state.name}
											onChange={this.saveToState}
										/>
									</Form.Field>
									<Form.Field width={6}>
										<label>Product Description</label>
										<input
											type="text"
											name="description"
											id="description"
											placeholder="100 Character Limit"
											maxLength="100"
											value={this.state.description}
											onChange={this.saveToState}
										/>
									</Form.Field>
									<Form.Field width={3}>
										<label>Price</label>
										<Input
											labelPosition="right"
											type="text"
											name="price"
											id="price"
											placeholder="Whole Dollars"
											maxLength="4">
											<Label basic>$</Label>
											<input value={this.state.price} onChange={this.saveToState} maxLength="4" />
											<Label>.00</Label>
										</Input>
									</Form.Field>
									<Form.Field
										width={2}
										control={Select}
										options={unitOptions}
										value={this.state.unit}
										onChange={this.selectInput}
										label={{ children: 'Units', htmlFor: 'unit' }}
										search
										fluid
										searchInput={{ id: 'unit' }}
									/>
									<Button type="submit" icon labelPosition="right">
										Add
									</Button>
								</Form.Group>
							</Form>
						</CreateProductStyling>
					);
				}}
			</Query>
		);
	}
}

export default UpdateProduct;
export {INDIVIDUAL_PRODUCT_QUERY}
