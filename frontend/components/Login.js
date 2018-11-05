import React, { Component } from 'react';
import { Form, Button, Grid, Icon, Message } from 'semantic-ui-react';
import styled from 'styled-components';
import Link from 'next/link';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY } from './User';
import FormStyling from './styles/FormStyles';
import Error from './ErrorMessage';
import LoggedIn from './LoggedIn';
import User from './User';
import Router from 'next/router';

const LOGIN_MUTATION = gql`
	mutation LOGIN_MUTATION($email: String!, $password: String!) {
		signin(email: $email, password: $password) {
			id
			email
			name
		}
	}
`;

class Login extends Component {
	// State for Form
	state = {
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
			<Grid container>
				<User>
					{({ data: { me } }) => {
						if (!me)
							return (
								<FormStyling>
									<h1>
										Login to <span>GROWN</span>
									</h1>
									<Mutation
										mutation={LOGIN_MUTATION}
										variables={this.state}
										refetchQueries={[{ query: CURRENT_USER_QUERY }]}
										onCompleted={this.formComplete}>
										{(signin, { loading, error, onCompleted }) => {
											if (error) return <Error error={error} />;
											return (
												<Form
													loading={loading}
													success={this.state.completed}
													method="post"
													onSubmit={async e => {
														e.preventDefault();
														await signin();
														this.setState({ email: '', password: '' });
													}}>
													<Message
														success
														header="You Logged In"
														content="Start exploring GROWN right now."
													/>
													<Form.Group>
														<Form.Field width={16}>
															<label>Email</label>
															<input
																type="email"
																name="email"
																placeholder="Email Address"
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
														Log
														{loading ? 'ging' : ''} In
														<Icon name="right arrow" />
													</Button>
												</Form>
											);
										}}
									</Mutation>
									<ul>
										<li>
											<Link href="/join">
												<a>Not yet a member?</a>
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

export default Login;
