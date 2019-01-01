/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { Component } from 'react';
import { Form, Button, Grid, Message, Icon, Loader } from 'semantic-ui-react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import PropTypes from 'prop-types';
import FormStyling from './styles/FormStyles';
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
  state = { completed: false };

  // Handle Value Change
  handleChange = e => {
    const { name, type, value } = e.target;
    this.setState({ [name]: value });
  };

  uploadFile = async (e, originalImage) => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'grownphotos');
    const res = await fetch('https://api.cloudinary.com/v1_1/dq7uyauun/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    this.setState({
      image: file.secure_url,
    });
  };

  updateFarm = async (e, updateFarmMutation) => {
    e.preventDefault();
    console.log(this.state);
    const res = await updateFarmMutation({
      variables: {
        id: this.props.id,
        ...this.state,
      },
    });
    this.setState({ completed: true });
  };

  backToPage = () => {
    Router.push({
      pathname: '/farm',
      query: { id: this.props.id },
    });
  };

  render() {
    return (
      <Query
        query={INDIVIDUAL_FARM_QUERY}
        variables={{ id: this.props.id }}
        refetchQueries={[{ query: INDIVIDUAL_FARM_QUERY }]}
        onCompleted={this.setCompleted}
      >
        {({ data, loading }) => {
          const { farm } = data;
          if (loading) return <Loader active inline />;
          if (!farm) return <p>No Farm for ID {this.props.id}</p>;
          return (
            <Grid>
              <FormStyling>
                {this.state.name ? (
                  <h1>Edit {this.state.name.toUpperCase()}</h1>
                ) : (
                  <h1>Edit {farm.name.toUpperCase()}</h1>
                )}
                <Button type="button" onClick={this.backToPage}>
                  Return to {this.state.name ? this.state.name.toUpperCase() : farm.name.toUpperCase()}
                </Button>
                <Mutation mutation={UPDATE_FARM_MUTATION} variables={this.state}>
                  {(updateFarm, { loading, error }) => {
                    if (error) return <Error error={error} />;
                    return (
                      <Form
                        success={this.state.completed}
                        method="post"
                        className="create-farm-form"
                        loading={loading}
                        onSubmit={async e => {
                          await this.updateFarm(e, updateFarm);
                        }}
                      >
                        <Message
                          success
                          header="UPDATE COMPLETE"
                          content="Check over your changes or make new ones if you wish."
                        />
                        <Form.Group>
                          <Form.Field width={16}>
                            <label htmlFor="name">
                              Farm Name
                              <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter Farm Name"
                                required
                                defaultValue={farm.name}
                                onChange={this.handleChange}
                                maxLength="30"
                              />
                            </label>
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={16}>
                            <label htmlFor="location">
                              Location
                              <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Enter Farm Address"
                                required
                                defaultValue={farm.location}
                                onChange={this.handleChange}
                                maxLength="60"
                              />
                            </label>
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={16}>
                            <label htmlFor="email">
                              Email Address
                              <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter Farm Email Address"
                                required
                                defaultValue={farm.email}
                                onChange={this.handleChange}
                              />
                            </label>
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={16}>
                            <label htmlFor="phone">
                              Phone Number
                              <input
                                id="phone"
                                type="text"
                                name="phone"
                                placeholder="Add Phone Number"
                                defaultValue={farm.phone}
                                onChange={this.handleChange}
                                maxLength="13"
                              />
                            </label>
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={16}>
                            <label htmlFor="tagline">
                              Tagline
                              <input
                                id="tagline"
                                type="text"
                                name="tagline"
                                placeholder="Add Short Farm Description"
                                defaultValue={farm.tagline}
                                onChange={this.handleChange}
                                maxLength="40"
                              />
                            </label>
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={16}>
                            <label htmlFor="description">
                              Description
                              <textarea
                                id="description"
                                rows="4"
                                name="description"
                                placeholder="Write description of Farm"
                                defaultValue={farm.description}
                                onChange={this.handleChange}
                              />
                            </label>
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={16}>
                            <label htmlFor="website">
                              Website
                              <input
                                id="website"
                                type="text"
                                name="website"
                                placeholder="Enter Farm Website"
                                defaultValue={farm.website}
                                onChange={this.handleChange}
                              />
                            </label>
                          </Form.Field>
                        </Form.Group>
                        <Form.Group>
                          <Form.Field width={16}>
                            <label htmlFor="image">
                              Farm Image
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
                            </label>
                          </Form.Field>
                        </Form.Group>
                        <Button type="submit" icon labelPosition="right">
                          Updat
                          {loading ? 'ing' : 'e'} Farm
                          <Icon name="right arrow" />
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
              </FormStyling>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

UpdateFarm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateFarm;
