import React, { Component } from 'react';
import { Grid, Header, Button, Image, Icon } from 'semantic-ui-react';
import { FarmInfo } from './styles/FarmStyles';
import PropTypes from 'prop-types';

class Farm extends Component {
	componentDidMount() {
		// Mount window for wowjs because of Next's server side rendering
		if (typeof window !== 'undefined') {
			window.WOW = require('wowjs');
		}
		new WOW.WOW({ live: false }).init();
	}

	render() {
		const { farm } = this.props;
		return (
			<Grid.Column centered="true" mobile={16} tablet={8} computer={8}>
				<FarmInfo className="wow fadeIn" data-wow-duration="2s">
					<Image src={farm.image} size="large" />
					<div className="farm-info">
						<h3>{farm.name}</h3>
						<h4>{farm.description}</h4>
						<p>
							<Icon name="location arrow" />
							{farm.location}
						</p>
					</div>
					<Button>Shop {farm.name}</Button>
				</FarmInfo>
			</Grid.Column>
		);
	}
}

Grid.PropTypes = {
	centered: PropTypes.bool
};

export default Farm;
