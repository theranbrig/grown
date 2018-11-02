import React from 'react';
import LoginCheck from '../components/LoginCheck';
import CreateFarm from '../components/CreateFarm';

const CreateFarmPage = props => (
	<LoginCheck>
		<CreateFarm />
	</LoginCheck>
);

export default CreateFarmPage;
