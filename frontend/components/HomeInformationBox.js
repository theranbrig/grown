import React from 'react';
import { Grid, Header, Container, Image } from 'semantic-ui-react';
import InformationBox from './styles/InformationBoxStyles';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class HomeInformationBox extends React.Component {
	componentDidMount() {
		if (typeof window !== 'undefined') {
			window.WOW = require('wowjs');
		}
		new WOW.WOW({ live: false }).init();
	}
	render() {
		return (
			<Grid.Row columns={2}>
				<Grid.Column>
					<Container
						text={true}
						fluid
						textAlign="center"
						className="wow slideInLeft "
						verticalAlign="center"
						data-wow-duration="2s">
						<InformationBox>
							<Header as="h2">{this.props.header}</Header>
							<Header as="h3">{this.props.subHeader}</Header>
							<p>{this.props.information}</p>
						</InformationBox>
					</Container>
				</Grid.Column>
				<Grid.Column>
					<Image
						src={this.props.image}
						size="large"
						centered={true}
						className="wow slideInRight"
						data-wow-duration="2s"
						verticalAlign="middle"
					/>
				</Grid.Column>
			</Grid.Row>
		);
	}
}
Grid.PropTypes = {
	centered: PropTypes.bool,
	text: PropTypes.bool
};

export default HomeInformationBox;
