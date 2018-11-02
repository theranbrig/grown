import React, { Component } from 'react';
import { Form, Button, Grid, Message, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import FormStyling from './styles/FormStyles';
import User from './User';
import LoggedIn from './LoggedIn';
import Router from 'next/router';
import Error from './ErrorMessage';

// Sign Up User Mutation
const CREATE_FARM_MUTATION = gql`
	mutation CREATE_FARM_MUTATION(
		$name: String!
		$email: String!
		$tagline: String!
		$description: String!
		$location: String!
		$phone: String!
		$website: String!
		$image: String!
	) {
		createFarm(
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

class CreateFarm extends Component {
	// State for Form
	state = {
		name: '',
		email: '',
		tagline: '',
		description: '',
		location: '',
		phone: '',
		website: '',
		image: ''
	};

	// Enter Information Value Handler
	saveToState = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	uploadFile = async e => {
		const files = e.target.files;
		const data = new FormData();
		data.append('file', files[0]);
		data.append('upload_preset', 'grownphotos');
		const res = await fetch('https://api.cloudinary.com/v1_1/dq7uyauun/image/upload', {
			method: 'POST',
			body: data
		});
		const file = await res.json();
		console.log(file);
		this.setState({
			image: file.secure_url
		});
	};

	render() {
		return (
			<Mutation mutation={CREATE_FARM_MUTATION} variables={this.state}>
				{(createFarm, { error, loading }) => {
					if (error) return <Error error={error} />;
					return (
						<Grid>
							<FormStyling>
								<h1>
									Add Your Farm to <span>GROWN</span>
								</h1>
								<Form
									success={this.state.completed}
									method="post"
									className="create-farm-form"
									loading={loading}
									onSubmit={async e => {
										e.preventDefault();
										const res = await createFarm();
										console.log(res);
										Router.push({
											pathname: '/farm',
											query: { id: res.data.createFarm.id }
										});
									}}>
									<Form.Group>
										<Form.Field width={16}>
											<label>Farm Name</label>
											<input
												type="text"
												name="name"
												placeholder="Enter Farm Name"
												value={this.state.name}
												onChange={this.saveToState}
												maxLength="30"
											/>
										</Form.Field>
									</Form.Group>
									<Form.Group>
										<Form.Field width={16}>
											<label>Location</label>
											<input
												type="text"
												name="location"
												placeholder="Enter Farm Address"
												value={this.state.location}
												onChange={this.saveToState}
												maxLength="60"
											/>
										</Form.Field>
									</Form.Group>
									<Form.Group>
										<Form.Field width={16}>
											<label>Email Address</label>
											<input
												type="email"
												name="email"
												placeholder="Enter Farm Email Address"
												value={this.state.email}
												onChange={this.saveToState}
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
												value={this.state.phone}
												onChange={this.saveToState}
												max-length="13"
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
												value={this.state.tagline}
												onChange={this.saveToState}
												maxLength="40"
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
												value={this.state.description}
												onChange={this.saveToState}
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
												value={this.state.website}
												onChange={this.saveToState}
											/>
										</Form.Field>
									</Form.Group>
									<Form.Group>
										<Form.Field width={16}>
											<label>Farm Image</label>
											<input
												type="file"
												name="image"
												placeholder="Choose Farm Image"
												onChange={this.uploadFile}
											/>
											{this.state.image && (
												<img width="200" src={this.state.image} alt="Upload Preview" />
											)}
										</Form.Field>
									</Form.Group>
									<Button type="submit" icon labelPosition="right">
										Add
										{loading ? 'ing' : ''} Farm
										<Icon name="right arrow" />
									</Button>
								</Form>
							</FormStyling>
						</Grid>
					);
				}}
			</Mutation>
		);
	}
}

export default CreateFarm;
