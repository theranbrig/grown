import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Grid, Loader, Message, Icon } from 'semantic-ui-react';
import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { MainArea } from './styles/FarmStyles';
import Farm from './Farm';
import Pagination from './Pagination';
import { perPage } from '../config';

// Graphql Query to get all farms
const ALL_FARMS_QUERY = gql`
	query ALL_FARMS_QUERY($skip: Int, $first: Int = ${perPage}) {
    farms(skip: $skip, first: $first, orderBy: name_DESC) {
			id
			name
			description
			location
			email
			phone
			image
			website
		}
	}
`;

const Farms = props => (
  <MainArea>
    <Head>
      <title>GROWN | Browse Farms</title>
    </Head>
    <div className="browse-header">
      <h2>
        View <span>GROWN</span> Farms
      </h2>
      <h3>Browse Fresh Food In Your Area</h3>
    </div>
    <Pagination page={props.page} />
    <div className="add-farm-link">
      <Link href="/createfarm">
        <a>
          Add New Farm <Icon name="add circle" />
        </a>
      </Link>
    </div>
    <Grid container centered textAlign="center">
      <Query query={ALL_FARMS_QUERY} variables={{ skip: props.page * perPage - perPage }}>
        {({ data, error, loading }) => {
          if (error) return <Message error header="Oops...Something Went Awry" content={error.message} compact />;
          if (loading) return <Loader active inline />;
          return (
            <React.Fragment>
              {data.farms.map(farm => (
                <Farm key={farm.id} farm={farm} />
              ))}
            </React.Fragment>
          );
        }}
      </Query>
    </Grid>
    <Pagination page={props.page} />
    <div className="add-farm-link">
      <Link href="/createfarm">
        <a>
          Add New Farm <Icon name="add circle" />
        </a>
      </Link>
    </div>
  </MainArea>
);

Farms.propTypes = {
  page: PropTypes.number.isRequired,
};

export default Farms;
export { ALL_FARMS_QUERY };
