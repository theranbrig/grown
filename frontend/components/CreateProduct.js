import React, { Component } from 'react';
import { Form, Button, Icon, Select, Label, Input } from 'semantic-ui-react';
import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import Error from './ErrorMessage';
import unitOptions from '../lib/formData';
import { PRODUCTS_QUERY } from './Store';

const CreateProductStyling = styled.div`
  margin: 0 auto;
  button {
    height: 38px;
    background-color: ${props => props.theme.lightBlue} !important;
    margin-top: 18px !important;
  }
  i {
    font-size: 1rem;
  }
  label {
    padding: 0;
    margin-bottom: 0 !important;
  }
`;
const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    $name: String!
    $description: String!
    $price: Int!
    $unit: String
    $farmId: String
    $image: String
  ) {
    createProduct(name: $name, description: $description, price: $price, unit: $unit, farmId: $farmId, image: $image) {
      id
    }
  }
`;

class CreateProduct extends Component {
  // State for Form
  state = {
    name: '',
    unit: '',
    price: '',
    description: '',
    farmId: '',
  };

  // Enter Information Value Handler

  componentDidMount() {
    this.setState({ farmId: this.props.id });
  }

  saveToState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  selectInput = (e, data) => {
    this.setState({ unit: data.value });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_PRODUCT_MUTATION}
        variables={this.state}
        refetchQueries={[
          {
            query: PRODUCTS_QUERY,
            variables: { farmId: this.state.farmId },
          },
        ]}
      >
        {(createProduct, { error, loading }) => {
          if (error) return <Error error={error} />;
          return (
            <CreateProductStyling>
              <h3>Add Product to Farm</h3>
              <Form
                method="post"
                loading={loading}
                onSubmit={async e => {
                  e.preventDefault();
                  const res = await createProduct();
                  this.setState({
                    name: '',
                    unit: '',
                    price: '',
                    description: '',
                  });
                }}
              >
                <Form.Group>
                  <Form.Field width={4}>
                    <label htmlFor="name">
                      Product Name
                      <input
                        required
                        type="text"
                        name="name"
                        id="name"
                        placeholder="30 Character Limit"
                        maxLength="30"
                        value={this.state.name}
                        onChange={this.saveToState}
                      />
                    </label>
                  </Form.Field>
                  <Form.Field width={6}>
                    <label htmlFor="description">
                      Product Description - {100 - this.state.description.length} Remaining
                      <input
                        required
                        type="text"
                        name="description"
                        id="description"
                        placeholder="100 Character Limit"
                        minLength={5}
                        maxLength={100}
                        value={this.state.description}
                        onChange={this.saveToState}
                      />
                    </label>
                  </Form.Field>
                  <Form.Field width={3}>
                    <label htmlFor="price">
                      Price
                      <Input
                        required
                        labelPosition="right"
                        type="number"
                        name="price"
                        id="price"
                        placeholder="Whole Dollars"
                        maxLength="4"
                      >
                        <Label basic>$</Label>
                        <input value={this.state.price} onChange={this.saveToState} maxLength="4" />
                        <Label>.00</Label>
                      </Input>
                    </label>
                  </Form.Field>
                  <Form.Field
                    id="unit"
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
                    {loading ? 'ing' : ''} <Icon name="up arrow" />
                  </Button>
                </Form.Group>
              </Form>
            </CreateProductStyling>
          );
        }}
      </Mutation>
    );
  }
}

CreateProduct.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CreateProduct;
