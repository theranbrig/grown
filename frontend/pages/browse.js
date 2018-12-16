import React from 'react';
import PropTypes from 'prop-types';
import Farms from '../components/Farms';

const FarmsPage = props => (
  <div>
    <Farms page={parseFloat(props.query.page) || 1} />
  </div>
);

FarmsPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default FarmsPage;
