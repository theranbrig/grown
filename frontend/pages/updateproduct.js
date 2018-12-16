import React from 'react';
import PropTypes from 'prop-types';
import LoginCheck from '../components/LoginCheck';
import UpdateProduct from '../components/UpdateProduct';

const UpdateProductPage = props => (
  <LoginCheck>
    <UpdateProduct id={props.query.id} />
  </LoginCheck>
);

UpdateProductPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default UpdateProductPage;
