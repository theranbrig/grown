import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { CURRENT_USER_QUERY } from './User';
import { Button, Icon } from 'semantic-ui-react';

class BuyMe extends React.Component {
	render() {
		const { id } = this.props;
		return (
			<Button icon labelPosition="right" className="buy-button">
				Buy Now
				<Icon name="cart plus" />
			</Button>
		);
	}
}
export default BuyMe;
