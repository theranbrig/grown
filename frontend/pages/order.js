import React from 'react';
import PropTypes from 'prop-types';
import FullOrder from '../components/FullOrder';
import LoginCheck from '../components/LoginCheck';

const FullOrderPage = props => (
  <LoginCheck>
    <FullOrder id={props.query.id} />
  </LoginCheck>
);

FullOrderPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default FullOrderPage;
