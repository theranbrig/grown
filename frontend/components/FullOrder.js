import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from 'next/link';
import { Grid, Loader, Segment, Icon, Table } from 'semantic-ui-react';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';
import OrdersStyling from './styles/OrderStyles';

const INDIVIDUAL_ORDER_QUERY = gql`
  query INDIVIDUAL_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      total
      charge
      total
      createdAt
      user {
        id
        name
        email
      }
      items {
        id
        quantity
        name
        price
        farmId
        product {
          farm {
            id
            name
            location
          }
        }
      }
    }
  }
`;

const FullOrder = props => (
  <Query query={INDIVIDUAL_ORDER_QUERY} variables={{ id: props.id }}>
    {({ data, error, loading }) => {
      console.log(data);
      if (error) return <p>Error...</p>;
      if (loading) return <Loader />;
      return (
        <OrdersStyling>
          <div className="order-header">
            <Link href="/orders">
              <a>
                <Icon name="arrow left" />
              </a>
            </Link>
            <h2>{data.order.user.name}'s Order Summary</h2>
            <p>#: {data.order.id}</p>
          </div>
          <Grid centered container>
            <Grid.Column>
              <div className="order-list">
                <Segment className="order-box">
                  <Segment.Group className="order-info">
                    <Segment>
                      <strong>Order #: </strong>
                      {data.order.id}
                    </Segment>
                    <Segment>Ordered {formatDistance(data.order.createdAt, new Date())} ago</Segment>
                    <Segment>
                      <strong>Customer:</strong> {data.order.user.name} - {data.order.user.email}
                    </Segment>
                  </Segment.Group>
                  <Segment.Group>
                    <Segment className="order-price">
                      <Icon name="dollar" />
                      <strong>{data.order.total / 100}.00</strong>
                    </Segment>
                    <Segment>
                      <strong>Payment Confirmation #:</strong> {data.order.charge}
                    </Segment>
                  </Segment.Group>
                  <Table className="order-table" padded="very">
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Product ID</Table.HeaderCell>
                        <Table.HeaderCell>Product</Table.HeaderCell>
                        <Table.HeaderCell>Farm</Table.HeaderCell>
                        <Table.HeaderCell textAlign="right">Order</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {data.order.items.map(item => (
                        <Table.Row key={item.id}>
                          <Table.Cell collapsing className="item-id">
                            {item.id}
                          </Table.Cell>
                          <Table.Cell collapsing>{item.name}</Table.Cell>
                          <Table.Cell collapsing>{item.product.farm.name.toUpperCase()}</Table.Cell>
                          <Table.Cell textAlign="right">
                            {item.quantity} &times; {item.price} = ${item.quantity * item.price}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Segment>
              </div>
            </Grid.Column>
          </Grid>
        </OrdersStyling>
      );
    }}
  </Query>
);

FullOrder.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FullOrder;
