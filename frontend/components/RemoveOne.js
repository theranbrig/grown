import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';

const REMOVE_ONE_MUTATION = gql`
  mutation addToCart($id: ID!) {
    removeOneFromCart(id: $id) {
      id
      quantity
    }
  }
`;

const RemoveOne = props => (
  <Mutation
    mutation={REMOVE_ONE_MUTATION}
    variables={{
      id: props.id,
    }}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(addToCart, { loading }) => (
      <Button icon disabled={loading} onClick={addToCart}>
        <Icon name="minus" />
      </Button>
    )}
  </Mutation>
);

RemoveOne.propTypes = {
  id: PropTypes.string.isRequired,
};

export default RemoveOne;
