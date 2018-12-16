import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

const AddToCart = ({ id }) => (
  <Mutation
    mutation={ADD_TO_CART_MUTATION}
    variables={{
      id,
    }}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(addToCart, { loading }) => (
      <Button icon labelPosition="right" disabled={loading} onClick={addToCart}>
        Add{loading ? 'ing' : ' '} To Cart
        <Icon name="cart plus" />
      </Button>
    )}
  </Mutation>
);

AddToCart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AddToCart;
export { ADD_TO_CART_MUTATION };
