import React from 'react';
import PropTypes from 'prop-types';
import IndividualFarm from '../components/IndividualFarm';

const IndividualFarmPage = props => (
  <div>
    <IndividualFarm id={props.query.id} />
  </div>
);

IndividualFarmPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default IndividualFarmPage;
