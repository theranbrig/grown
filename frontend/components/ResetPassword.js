import React, { Component } from 'react';
import { Grid, Form, Message, Icon, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';
import User from './User';
import FormStyling from './styles/FormStyles';
import LoggedIn from './LoggedIn';

const PASSWORD_RESET_MUTATION = gql`
  mutation PASSWORD_RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
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
    completed: false,
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
                      confirmPassword: this.state.confirmPassword,
                    }}
                    onCompleted={this.formComplete}
                  >
                    {(resetPassword, { error, loading }) => {
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
                              pathname: '/browse',
                            });
                          }}
                        >
                          <Message
                            success
                            header="Your password has been reset."
                            content="You are now logged into GROWN."
                          />
                          <Form.Group>
                            <Form.Field width={16}>
                              <label htmlFor="password">
                                Password
                                <input
                                  id="password"
                                  type="password"
                                  name="password"
                                  placeholder="Enter Password"
                                  value={this.state.password}
                                  onChange={this.saveToState}
                                />
                              </label>
                            </Form.Field>
                          </Form.Group>
                          <Form.Group>
                            <Form.Field width={16}>
                              <label htmlFor="confirmPassword">
                                Confirm
                                <input
                                  id="confirmPassword"
                                  type="password"
                                  name="confirmPassword"
                                  placeholder="Confirm Password"
                                  value={this.state.confirmPassword}
                                  onChange={this.saveToState}
                                />
                              </label>
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
    );
  }
}

ResetPassword.propTypes = {
  resetToken: PropTypes.string.isRequired,
};

export default ResetPassword;
