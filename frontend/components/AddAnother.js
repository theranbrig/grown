import React from 'react';
import { Mutation } from 'react-apollo';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from './User';
import { ADD_TO_CART_MUTATION } from './AddToCart';

const AddAnother = ({ id }) => (
  <Mutation
    mutation={ADD_TO_CART_MUTATION}
    variables={{
      id,
    }}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {(addToCart, { loading }) => (
      <Button icon disabled={loading} onClick={addToCart}>
        <Icon name="plus" />
      </Button>
    )}
  </Mutation>
);

AddAnother.propTypes = {
  id: PropTypes.string.isRequired,
};

export default AddAnother;
