import React, { Component } from 'react';
import { Form, Button, Grid, Message, Icon, Loader } from 'semantic-ui-react';
import styled from 'styled-components';
import Link from 'next/link';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import FormStyling from './styles/FormStyles';
import User from './User';
import LoggedIn from './LoggedIn';
import Router from 'next/router';
import Error from './ErrorMessage';

// Sign Up User Mutation
const INDIVIDUAL_FARM_QUERY = gql`
	query INDIVIDUAL_FARM_QUERY($id: ID!) {
		farm(where: { id: $id }) {
			id
			name
			description
			location
			tagline
			phone
			email
			image
			website
		}
	}
`;
const UPDATE_FARM_MUTATION = gql`
	mutation UPDATE_FARM_MUTATION(
		$id: ID!
		$name: String
		$email: String
		$tagline: String
		$description: String
		$location: String
		$phone: String
		$website: String
		$image: String
	) {
		updateFarm(
			id: $id
			name: $name
			email: $email
			tagline: $tagline
			description: $description
			location: $location
			phone: $phone
			website: $website
			image: $image
		) {
			id
		}
	}
`;

class UpdateFarm extends Component {
	// State for Form
	state = {};

	// Handle Value Change
	handleChange = e => {
		const { name, type, value } = e.target;
		this.setState({ [name]: value });
	};

	uploadFile = async (e, originalImage) => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'grownphotos');
		const res = await fetch('https://api.cloudinary.com/v1_1/dq7uyauun/image/upload', {
			method: 'POST',
			body: data
		});
		const file = await res.json();
		this.setState({
			image: file.secure_url
		});
	};

	updateFarm = async (e, updateFarmMutation) => {
		e.preventDefault();
		console.log(this.state);
		const res = await updateFarmMutation({
			variables: {
				id: this.props.id,
				...this.state
			}
		});
	};

	render() {
		return (
			<Query query={INDIVIDUAL_FARM_QUERY} variables={{ id: this.props.id }}>
				{({ data, loading }) => {
					const farm = data.farm;
					if (loading) return <Loader active inline />;
					if (!farm) return <p>No Farm for ID {this.props.id}</p>;
					return (
						<Grid>
							<FormStyling>
								<h1>
									Update <span>{farm.name}</span>
								</h1>
								<Mutation mutation={UPDATE_FARM_MUTATION} variables={this.state}>
									{(updateFarm, { loading, error }) => {
										if (error) return <Error error={error} />;
										return (
											<Form
												success={this.state.completed}
												method="post"
												className="create-farm-form"
												loading={loading}
												onSubmit={e => {
													this.updateFarm(e, updateFarm);
													Router.push({
														pathname: '/farm',
														query: { id: this.props.id }
													});
												}}>
												<Form.Group>
													<Form.Field width={16}>
														<label>Farm Name</label>
														<input
															type="text"
															id="name"
															name="name"
															placeholder="Enter Farm Name"
															required
															defaultValue={farm.name}
															onChange={this.handleChange}
														/>
													</Form.Field>
												</Form.Group>
												<Form.Group>
													<Form.Field width={16}>
														<label>Location</label>
														<input
															type="text"
															id="location"
															name="location"
															placeholder="Enter Farm Address"
															required
															defaultValue={farm.location}
															onChange={this.handleChange}
														/>
													</Form.Field>
												</Form.Group>
												<Form.Group>
													<Form.Field width={16}>
														<label>Email Address</label>
														<input
															type="email"
															id="email"
															name="email"
															placeholder="Enter Farm Email Address"
															required
															defaultValue={farm.email}
															onChange={this.handleChange}
														/>
													</Form.Field>
												</Form.Group>
												<Form.Group>
													<Form.Field width={16}>
														<label>Phone Number</label>
														<input
															type="text"
															name="phone"
															placeholder="Add Phone Number"
															defaultValue={farm.phone}
															onChange={this.handleChange}
														/>
													</Form.Field>
												</Form.Group>
												<Form.Group>
													<Form.Field width={16}>
														<label>Tagline</label>
														<input
															type="text"
															name="tagline"
															placeholder="Add Short Farm Description"
															defaultValue={farm.tagline}
															onChange={this.handleChange}
														/>
													</Form.Field>
												</Form.Group>
												<Form.Group>
													<Form.Field width={16}>
														<label>Description</label>
														<textarea
															rows="4"
															name="description"
															placeholder="Write description of Farm"
															defaultValue={farm.description}
															onChange={this.handleChange}
														/>
													</Form.Field>
												</Form.Group>
												<Form.Group>
													<Form.Field width={16}>
														<label>Website</label>
														<input
															type="text"
															name="website"
															placeholder="Enter Farm Website"
															defaultValue={farm.website}
															onChange={this.handleChange}
														/>
													</Form.Field>
												</Form.Group>
												<Form.Group>
													<Form.Field width={16}>
														<label>Farm Image</label>
														<input
															type="file"
															name="image"
															id="image"
															placeholder="Choose Farm Image"
															onChange={this.uploadFile}
														/>
														{this.state.image ? (
															<img width="200" src={this.state.image} alt="Upload Preview" />
														) : (
															<img width="200" src={farm.image} alt="Upload Preview" />
														)}
													</Form.Field>
												</Form.Group>
												<Button type="submit" icon labelPosition="right">
													Add
													{/* {loading ? 'ing' : ''} Farm */}
													<Icon name="right arrow" />
												</Button>
											</Form>
										);
									}}
								</Mutation>
							</FormStyling>
						</Grid>
					);
				}}
			</Query>
		);
	}
}

export default UpdateFarm;
