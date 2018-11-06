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

// Sign Up User Mutation
const JOIN_MUTATION = gql`
	mutation JOIN_MUTATION($email: String!, $name: String!, $password: String!) {
		signup(email: $email, name: $name, password: $password) {
			id
			email
			name
		}
	}
`;

class SignUp extends Component {
	// State for Form
	state = {
		name: '',
		email: '',
		password: '',
		completed: false
	};

	// Enter Information Value Handler
	saveToState = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	formComplete = () => {
		this.setState({ completed: true });
	};

	render() {
		return (
			<Grid>
				<User>
					{({ data: { me } }) => {
						if (!me)
							return (
								<FormStyling>
									<h1>
										Sign Up for <span>GROWN</span>
									</h1>
									<Mutation
										mutation={JOIN_MUTATION}
										variables={this.state}
										onCompleted={this.formComplete}
										refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
										{(signup, { error, loading }) => {
											if (error) return <Error error={error} />;
											return (
												<Form
													loading={loading}
													success={this.state.completed}
													method="post"
													onSubmit={async e => {
														e.preventDefault();
														await signup();
														this.setState({ name: '', email: '', password: '' });
													}}>
													<Form.Group>
														<Form.Field width={16}>
															<label>Name</label>
															<input
																type="text"
																name="name"
																placeholder="Enter Name"
																value={this.state.name}
																onChange={this.saveToState}
															/>
														</Form.Field>
													</Form.Group>
													<Form.Group>
														<Form.Field width={16}>
															<label>Email</label>
															<input
																type="text"
																name="email"
																placeholder="Enter Email Address"
																value={this.state.email}
																onChange={this.saveToState}
															/>
														</Form.Field>
													</Form.Group>
													<Form.Group>
														<Form.Field width={16}>
															<label>Password</label>
															<input
																type="password"
																name="password"
																placeholder="Enter Password"
																value={this.state.password}
																onChange={this.saveToState}
															/>
														</Form.Field>
													</Form.Group>
													<Button type="submit" icon labelPosition="right">
														Sign
														{loading ? 'ing' : ''} Up
														<Icon name="right arrow" />
													</Button>
													<Message
														error
														header="Action Forbidden"
														content="You can only sign up for an account once with a given e-mail address."
													/>
												</Form>
											);
										}}
									</Mutation>
									<ul>
										<li>
											<Link href="/login">
												<a>Already a member?</a>
											</Link>
										</li>
										<li>
											<Link href="/resetpassword">
												<a>Forgot your password?</a>
											</Link>
										</li>
									</ul>
								</FormStyling>
							);
						if (me) return <LoggedIn />;
					}}
				</User>
			</Grid>
		);
	}
}

export default SignUp;
