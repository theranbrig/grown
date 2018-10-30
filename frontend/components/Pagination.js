import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';
import { perPage } from '../config';
import PaginationStyles from './styles/PaginationStyles';
import { Loader } from 'semantic-ui-react';

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

const Pagination = props => {
	return (
		<Query query={PAGINATION_QUERY}>
			{({ data, loading, error }) => {
				if (error) return <p>Error...</p>;
				if (loading) return <Loader active inline />;
				// Set Pages and Count of total Farms
				const count = data.farmsConnection.aggregate.count;
				const pages = Math.ceil(count / perPage);
				const page = props.page;
				return (
					<PaginationStyles>
						<Link
							prefetch
							href={{
								pathname: 'browse',
								query: { page: page - 1 }
							}}>
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
								query: { page: page + 1 }
							}}>
							<a className="prev" aria-disabled={page >= pages}>
								Next &#x2192;
							</a>
						</Link>
					</PaginationStyles>
				);
			}}
		</Query>
	);
};

export default Pagination;
