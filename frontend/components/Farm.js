import React, { Component } from 'react';
import { Grid, Header, Button, Image, Icon } from 'semantic-ui-react';
import { FarmInfo } from './styles/FarmStyles';
import PropTypes from 'prop-types';
import Link from 'next/link';

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
						<p>
							<Icon name="location arrow" />
							{farm.location}
						</p>
					</div>
					<div className="farm-link">
						<Link
							href={{
								pathname: 'farm',
								query: { id: farm.id }
							}}>
							<a>
								Explore {farm.name} <i className="arrow alternate circle right outline icon" />
							</a>
						</Link>
					</div>
				</FarmInfo>
			</Grid.Column>
		);
	}
}

Grid.PropTypes = {
	centered: PropTypes.bool
};

export default Farm;
