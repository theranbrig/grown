import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { Loader, Grid, Image, Icon } from 'semantic-ui-react';
import MapContainer from './FarmMap';
import { GoogleApiWrapper } from 'google-maps-react';
import StyledFarmInfo from './styles/IndividualFarmStyles';
import Link from 'next/link';
import User from './User';
import DeleteFarmButton from './DeleteFarmButton';

const INDIVIDUAL_FARM_QUERY = gql`
	query INDIVIDUAL_FARM_QUERY($id: ID!) {
		farm(where: { id: $id }) {
			id
			name
			tagline
			description
			location
			phone
			email
			image
			user {
				id
			}
		}
	}
`;

class IndividualFarm extends Component {
	render() {
		return (
			<User>
				{({ data: { me } }) => (
					<Query query={INDIVIDUAL_FARM_QUERY} variables={{ id: this.props.id }}>
						{({ data, loading, error }) => {
							if (loading) return <Loader active inline />;
							if (error) return <p>Error...</p>;
							const farm = data.farm;
							return (
								<StyledFarmInfo>
									<div className="farm-header">
										<h2>{farm.name}</h2>
										<h3>Explore and Shop</h3>
									</div>
									<Grid container>
										<Grid.Row>
											<Grid.Column mobile={16} computer={8}>
												<Image src={farm.image} alt={farm.name} centered />
												<h3>{farm.tagline}</h3>
												<ul>
													<li>Cucumbers</li>
													<li>Potatoes</li>
													<li>Sweet Corn</li>
													<li>Radishes</li>
													<li>And More...</li>
												</ul>
											</Grid.Column>
											<Grid.Column mobile={16} computer={8}>
												<div className="info-box">
													<div className="text-info">
														<h4>{farm.name}</h4>
														{me &&
															me.id === farm.user.id && (
																<div className="edit-farm-link">
																	<Link
																		href={{
																			pathname: '/updatefarm',
																			query: { id: farm.id }
																		}}>
																		<a>
																			<Icon name="edit" />
																			Edit Farm Information
																		</a>
																	</Link>
																	<DeleteFarmButton id={farm.id} />
																</div>
															)}
														<p>
															<Icon name="map" />
															{farm.location}
														</p>
														<p>{farm.description}</p>
														<div className="phone-email">
															<Icon name="mail" />
															<a href={`mailto:${farm.email}`}>{farm.email}</a>
														</div>
														<div className="phone-email">
															<Icon name="phone" />
															<a href={`tel:${farm.phone}`}>{farm.phone}</a>
														</div>
													</div>
													<MapContainer location={farm.location} name={farm.name} />
												</div>
											</Grid.Column>
										</Grid.Row>
									</Grid>
									<Grid container centered>
										<div className="farm-header">
											<h2>Shop Coming Soon</h2>
											<h3>Order for pickup at your markets</h3>
										</div>
									</Grid>
								</StyledFarmInfo>
							);
						}}
					</Query>
				)}
			</User>
		);
	}
}

export default IndividualFarm;
export { INDIVIDUAL_FARM_QUERY };
