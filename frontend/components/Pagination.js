import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';
import { Loader, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import PaginationStyles from './styles/PaginationStyles';

// GQL Query for total farms in db.
const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    farmsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (error) {
        console.log(error);
        return <Message error header="Oops...Something Went Awry" content={error.message} />;
      }
      if (loading) return <Loader active inline />;
      // Set Pages and Count of total Farms
      const { count } = data.farmsConnection.aggregate;
      const pages = Math.ceil(count / 6);
      const { page } = props;
      return (
        <PaginationStyles>
          <Link
            prefetch
            href={{
              pathname: 'browse',
              query: { page: page - 1 },
            }}
          >
            <a className="prev" aria-disabled={page <= 1}>
              &#x2190; Prev
            </a>
          </Link>
          <p>
            Page {props.page} of {pages}
          </p>
          <Link
            prefetch
            href={{
              pathname: 'browse',
              query: { page: page + 1 },
            }}
          >
            <a className="prev" aria-disabled={page >= pages}>
              Next &#x2192;
            </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
};

export default Pagination;
