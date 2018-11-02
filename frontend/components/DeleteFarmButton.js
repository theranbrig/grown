import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_FARMS_QUERY } from './Farms';
import Router from 'next/router';
import styled from 'styled-components';

const DeleteButtonStyle = styled.div`
	.ui.button {
		background-color: ${props => props.theme.offWhite} !important;
		font-size: 1.5rem;
		color: ${props => props.theme.regularBlue};
		font-family: 'Lato', sans-serif !important;
		padding-left: 0px;
		font-weight: 300;
	}
	i {
		color: ${props => props.theme.darkBlue};
		font-size: 1.8rem;
	}
`;

const DELETE_FARM_MUTATION = gql`
	mutation DELETE_FARM_MUTATION($id: ID!) {
		deleteFarm(id: $id) {
			id
		}
	}
`;

class DeleteFarmButton extends Component {
	// Update cache minus deleted farm
	update = (cache, payload) => {
		const data = cache.readQuery({ query: ALL_FARMS_QUERY });
		data.farms = data.farms.filter(farm => farm.id !== payload.data.deleteFarm.id);
		cache.writeQuery({ query: ALL_FARMS_QUERY, data });
	};

	render() {
		return (
			<Mutation
				mutation={DELETE_FARM_MUTATION}
				variables={{ id: this.props.id }}
				update={this.update}>
				{(deleteFarm, { error }) => (
					<DeleteButtonStyle>
						<Button
							onClick={() => {
								if (confirm('Are you sure you want to permanently delete your farm?')) {
									deleteFarm().catch(err => {
										alert(err.message);
									});
									Router.push({
										pathname: '/browse'
									});
								}
							}}>
							<Icon name="delete" />
							Delete Farm
						</Button>
					</DeleteButtonStyle>
				)}
			</Mutation>
		);
	}
}

export default DeleteFarmButton;
