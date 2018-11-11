import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { PRODUCTS_QUERY } from './Store';
import Router from 'next/router';
import styled from 'styled-components';

const DeleteButtonStyle = styled.div`
	.ui.icon.button {
		background: green !important;
		font-size: 1.5rem;
		color: ${props => props.theme.regularBlue};
		font-family: 'Lato', sans-serif !important;
		padding: 0px;
		font-weight: 300;
		width: 20px;
		display: inline-block;
	}
	i {
		color: ${props => props.theme.darkBlue};
		font-size: 1.8rem;
	}
`;

const DELETE_PRODUCT_MUTATION = gql`
	mutation DELETE_PRODUCT_MUTATION($id: ID!) {
		deleteProduct(id: $id) {
			id
		}
	}
`;

class DeleteProductButton extends Component {
	render() {
		return (
			<Mutation mutation={DELETE_PRODUCT_MUTATION} variables={{ id: this.props.id }}>
				{(deleteProduct, { data, error, loading }) => (
					<Button
						icon
						onClick={() => {
							if (confirm('Are you sure you want to permanently delete your product?')) {
								deleteProduct().catch(err => {
									alert(err.message);
								});
							}
						}}>
						<Icon name="delete" />
					</Button>
				)}
			</Mutation>
		);
	}
}

export default DeleteProductButton;
