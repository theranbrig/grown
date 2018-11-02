import React, { Component } from 'react';
import { Grid, Form, Message, Icon, Button } from 'semantic-ui-react';
import FormStyling from './styles/FormStyles';
import Link from 'next/link';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import User from './User';
import Next from 'next/router';
import LoggedIn from './LoggedIn'

const PASSWORD_RESET_MUTATION = gql`
	mutation PASSWORD_RESET_MUTATION(
		$resetToken: String!
		$password: String!
		$confirmPassword: String!
	) {
		resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
			id
			email
			name
		}
	}
`;

class ResetPassword extends Component {
	state = {
		password: '',
		confirmPassword: '',
		completed: false
	};

	saveToState = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	// Complete Form for success message
	formComplete = () => {
		this.setState({ completed: true });
	};

	render() {
		return (
			<div>
				<div>
					<Grid container>
						<User>
							{({ data: { me } }) => {
								if (!me)
									return (
										<FormStyling>
											<h1>
												Send <span>GROWN</span> Password
											</h1>
											<Mutation
												mutation={PASSWORD_RESET_MUTATION}
												variables={{
													resetToken: this.props.resetToken,
													password: this.state.password,
													confirmPassword: this.state.confirmPassword
												}}
												onCompleted={this.formComplete}>
												{(resetPassword, { error, loading, called }) => {
													if (error) return <Error error={error} />;
													return (
														<Form
															success={this.state.completed}
															loading={loading}
															method="post"
															onSubmit={async e => {
																e.preventDefault();
																await resetPassword();
																this.setState({ password: '', confirmPassword: '' });
																Router.push({
																	pathname: '/browse'
																});
															}}>
															<Message
																success
																header="Your password has been reset."
																content="You are now logged into GROWN."
															/>
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
															<Form.Group>
																<Form.Field width={16}>
																	<label>Confirm</label>
																	<input
																		type="password"
																		name="confirmPassword"
																		placeholder="Confirm Password"
																		value={this.state.confirmPassword}
																		onChange={this.saveToState}
																	/>
																</Form.Field>
															</Form.Group>
															<Button type="submit" icon labelPosition="right">
																Send
																{loading ? 'ing' : ''} In
																<Icon name="right arrow" />
															</Button>
														</Form>
													);
												}}
											</Mutation>
										</FormStyling>
									);
								if (me) return <LoggedIn />;
							}}
						</User>
					</Grid>
				</div>
			</div>
		);
	}
}

export default ResetPassword;
