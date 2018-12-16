import React, { Component } from 'react';
import { Grid, Button, Form, Icon, Message } from 'semantic-ui-react';
import Link from 'next/link';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import FormStyling from './styles/FormStyles';
import Error from './ErrorMessage';
import User from './User';
import LoggedIn from './LoggedIn';

const PASSWORD_REQUEST_RESET_MUTATION = gql`
  mutation PASSWORD_REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

class PasswordResetRequest extends Component {
  state = {
    email: '',
    completed: false,
  };

  // Enter Information Value Handler
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
        <Grid container>
          <User>
            {({ data: { me } }) => {
              if (!me)
                return (
                  <FormStyling>
                    <h1>
                      Send <span>GROWN</span> Password Reset
                    </h1>
                    <Mutation
                      mutation={PASSWORD_REQUEST_RESET_MUTATION}
                      variables={this.state}
                      onCompleted={this.formComplete}
                    >
                      {(requestReset, { error, loading }) => {
                        if (error) return <Error error={error} />;
                        return (
                          <Form
                            success={this.state.completed}
                            loading={loading}
                            method="post"
                            onSubmit={async e => {
                              e.preventDefault();
                              await requestReset();
                              this.setState({ email: '' });
                            }}
                          >
                            <Message
                              success
                              header="You have been sent a link to reset your GROWN password."
                              content="Check your email."
                            />
                            <Form.Group>
                              <Form.Field width={16}>
                                <label htmlFor="email">
                                  Email
                                  <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={this.state.email}
                                    onChange={this.saveToState}
                                  />
                                </label>
                              </Form.Field>
                            </Form.Group>
                            <Button type="submit" icon labelPosition="right">
                              Send
                              {loading ? 'ing' : ''}
                              <Icon name="right arrow" />
                            </Button>
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
                        <Link href="/join">
                          <a>Not yet a member?</a>
                        </Link>
                      </li>
                    </ul>
                  </FormStyling>
                );
              if (me) return <LoggedIn />;
            }}
          </User>
        </Grid>
      </div>
    );
  }
}

export default PasswordResetRequest;
