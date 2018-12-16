/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */

import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { INDIVIDUAL_FARM_QUERY } from './IndividualFarm';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

const DeleteProductButton = props => (
  <Mutation
    mutation={DELETE_PRODUCT_MUTATION}
    variables={{ id: props.id }}
    refetchQueries={[{ query: INDIVIDUAL_FARM_QUERY, variables: { id: props.id } }]}
  >
    {(deleteProduct, { error }) => (
      <Button
        icon
        onClick={() => {
          if (confirm('Are you sure you want to permanently delete your product?')) {
            deleteProduct().catch(err => {
              alert(err.message);
            });
          }
        }}
      >
        <Icon name="delete" />
      </Button>
    )}
  </Mutation>
);

DeleteProductButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteProductButton;
