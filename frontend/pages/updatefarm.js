import React from 'react';
import PropTypes from 'prop-types';
import LoginCheck from '../components/LoginCheck';
import UpdateFarm from '../components/UpdateFarm';

const UpdateFarmPage = props => (
  <LoginCheck>
    <UpdateFarm id={props.query.id} />
  </LoginCheck>
);

UpdateFarmPage.propTypes = {
  query: PropTypes.object.isRequired,
};

export default UpdateFarmPage;
