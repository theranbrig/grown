import React, { Component } from 'react';
import { Form, Button, Grid, Icon } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import FormStyling from './styles/FormStyles';
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
    image: '',
  };

  // Enter Information Value Handler
  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  uploadFile = async e => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'grownphotos');
    const res = await fetch('https://api.cloudinary.com/v1_1/dq7uyauun/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
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
                      query: { id: res.data.createFarm.id },
                    });
                  }}
                >
                  <Form.Group>
                    <Form.Field width={16}>
                      <label htmlFor="name">
                        Farm Name
                        <input
                          minLength={5}
                          maxLength={40}
                          required
                          id="name"
                          type="text"
                          name="name"
                          placeholder="Enter Farm Name"
                          value={this.state.name}
                          onChange={this.saveToState}
                        />
                      </label>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={16}>
                      <label htmlFor="location">
                        Location
                        <input
                          minLength={5}
                          maxLength={60}
                          required
                          id="location"
                          type="text"
                          name="location"
                          placeholder="Enter Farm Address"
                          value={this.state.location}
                          onChange={this.saveToState}
                        />
                      </label>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={16}>
                      <label htmlFor="email">
                        Email Address
                        <input
                          minLength={5}
                          maxLength={100}
                          required
                          id="email"
                          type="email"
                          name="email"
                          placeholder="Enter Farm Email Address"
                          value={this.state.email}
                          onChange={this.saveToState}
                        />
                      </label>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={16}>
                      <label htmlFor="phone">
                        Phone Number
                        <input
                          minLength={9}
                          maxLength={10}
                          required
                          id="phone"
                          type="text"
                          name="phone"
                          placeholder="Add Phone Number"
                          value={this.state.phone}
                          onChange={this.saveToState}
                          max-length="13"
                        />
                      </label>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={16}>
                      <label htmlFor="tagline">
                        Tagline
                        <input
                          minLength={5}
                          maxLength={40}
                          required
                          id="tagline"
                          type="text"
                          name="tagline"
                          placeholder="Add Short Farm Description"
                          value={this.state.tagline}
                          onChange={this.saveToState}
                        />
                      </label>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={16}>
                      <label htmlFor="description">
                        Description - Characters Remaining {500 - this.state.description.length}
                        <textarea
                          minLength={5}
                          maxLength={500}
                          required
                          id="description"
                          rows="4"
                          name="description"
                          placeholder="Write description of Farm - Max 500 Characters"
                          value={this.state.description}
                          onChange={this.saveToState}
                        />
                      </label>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={16}>
                      <label htmlFor="website">
                        Website
                        <input
                          minLength={5}
                          maxLength={40}
                          required
                          id="website"
                          type="text"
                          name="website"
                          placeholder="Enter Farm Website"
                          value={this.state.website}
                          onChange={this.saveToState}
                        />
                      </label>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group>
                    <Form.Field width={16}>
                      <label htmlFor="image">
                        Farm Image
                        <input
                          required
                          id="image"
                          type="file"
                          name="image"
                          placeholder="Choose Farm Image"
                          onChange={this.uploadFile}
                        />
                        {this.state.image && <img width="200" src={this.state.image} alt="Upload Preview" />}
                      </label>
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
