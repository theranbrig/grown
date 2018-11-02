import React from 'react';
import LoginCheck from '../components/LoginCheck';
import UpdateFarm from '../components/UpdateFarm';

const UpdateFarmPage = props => (
	<LoginCheck>
		<UpdateFarm id={props.query.id} />
	</LoginCheck>
);

export default UpdateFarmPage;
