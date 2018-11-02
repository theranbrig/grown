import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { MainArea } from './styles/FarmStyles';
import Farm from './Farm';
import { Grid, Container, Loader } from 'semantic-ui-react';
import Pagination from './Pagination';
import Head from 'next/head';
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

class Farms extends Component {
	render() {
		return (
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
				<Pagination page={this.props.page} />
				<Grid container centered textAlign="center">
					<Query query={ALL_FARMS_QUERY} variables={{ skip: this.props.page * perPage - perPage }}>
						{({ data, error, loading }) => {
							if (error) return <p>Error...</p>;
							if (loading) return <Loader active inline />;
							return (
								<>
									{data.farms.map(farm => (
										<Farm key={farm.id} farm={farm} />
									))}
								</>
							);
						}}
					</Query>
				</Grid>
				<Pagination page={this.props.page} />
			</MainArea>
		);
	}
}

export default Farms;
