import React from 'react';
import IndividualFarm from '../components/IndividualFarm';

const IndividualFarmPage = props => (
	<div>
		<IndividualFarm id={props.query.id} />
	</div>
);

export default IndividualFarmPage;
