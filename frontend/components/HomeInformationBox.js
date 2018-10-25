import React from 'react';
import { Grid, Header, Container, Image } from 'semantic-ui-react';
import { InformationBox, ImageBox } from './styles/InformationBoxStyles';
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
			<Grid.Row centered columns={2}>
				<Grid.Column>
					<Container
						text={true}
						fluid
						textAlign="center"
						className="wow fadeInRight"
						verticalalign="center"
						data-wow-duration="2s">
						<InformationBox>
							<Header as="h2">{this.props.header}</Header>
							<Header as="h3">{this.props.subHeader}</Header>
							<p>{this.props.information}</p>
						</InformationBox>
					</Container>
				</Grid.Column>
				<Grid.Column>
					<ImageBox>
						<Image
							src={this.props.image}
							responsive="true"
							centered
							className="wow fadeInLeft point-image"
							data-wow-duration="2s"
							verticalAlign="middle"
						/>
					</ImageBox>
				</Grid.Column>
			</Grid.Row>
		);
	}
}
Grid.PropTypes = {
	centered: PropTypes.bool,
	text: PropTypes.bool,
	responsive: PropTypes.bool
};

export default HomeInformationBox;
