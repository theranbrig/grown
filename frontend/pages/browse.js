import React from 'react';
import Farms from '../components/Farms';

const FarmsPage = props => (
	<div>
		<Farms page={parseFloat(props.query.page) || 1} />
	</div>
);

export default FarmsPage;
