/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';
import PropTypes from 'prop-types';
import User from './User';
import DeleteProductButton from './DeleteProductButton';
import AddToCart from './AddToCart';
import StoreStyling from './styles/StoreStyles';

const PRODUCTS_QUERY = gql`
  query PRODUCTS_QUERY($farmId: String) {
    products(where: { farmId: $farmId }) {
      id
      name
      price
      image
      description
      unit
      farm {
        user {
          id
        }
      }
    }
  }
`;

class Store extends Component {
  state = {
    id: null,
    updateProduct: false,
  };

  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <Query query={PRODUCTS_QUERY} variables={{ farmId: this.props.id }}>
            {({ data, error }) => {
              const { products } = data;
              if (products.length === 0)
                return (
                  <StoreStyling>
                    <Table striped stackable>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell colSpan="6">
                            {this.props.name.toUpperCase()} Store - Add Items to your Cart
                          </Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell collapsing textAlign="center">
                            No Products Available for Purchase
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                  </StoreStyling>
                );
              return (
                <StoreStyling>
                  <h2>Purchase {this.props.name} Products</h2>
                  <Table striped stackable>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell colSpan="6">
                          {this.props.name.toUpperCase()} Store - Add Items to your Cart
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {products.map(product => (
                        <Table.Row key={product.id}>
                          <Table.Cell width={3}>{product.name}</Table.Cell>
                          <Table.Cell width={7}>{product.description}</Table.Cell>
                          <Table.Cell width={2}>
                            <Icon name="dollar sign" /> {product.price} / {product.unit}
                          </Table.Cell>
                          <Table.Cell textAlign="center" width={3}>
                            <AddToCart id={product.id} />
                          </Table.Cell>
                          {me && me.id === product.farm.user.id && (
                            <React.Fragment>
                              <Table.Cell textAlign="right" width={1}>
                                <Link
                                  href={{
                                    pathname: '/updateproduct',
                                    query: { id: product.id },
                                  }}
                                >
                                  <a>
                                    <Icon name="edit" />
                                  </a>
                                </Link>
                              </Table.Cell>
                              <Table.Cell textAlign="right" width={1} className="delete-button">
                                <DeleteProductButton id={product.id} />
                              </Table.Cell>
                            </React.Fragment>
                          )}
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </StoreStyling>
              );
            }}
          </Query>
        )}
      </User>
    );
  }
}

Store.propTypes = {
  value: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Store;
export { PRODUCTS_QUERY };
