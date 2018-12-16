import React, { Component } from 'react';
import { Grid, Image, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FarmInfo } from './styles/FarmStyles';

class Farm extends Component {
  componentDidMount() {
    // Mount window for wowjs because of Next's server side rendering
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line global-require
      window.WOW = require('wowjs');
    }
    // eslint-disable-next-line no-undef
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
                query: { id: farm.id },
              }}
            >
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

Grid.propTypes = {
  centered: PropTypes.bool,
};

Farm.propTypes = {
  farm: PropTypes.object.isRequired,
};

export default Farm;
