import React from 'react';
import FullOrder from '../components/FullOrder';
import LoginCheck from '../components/LoginCheck';

const FullOrderPage = props => (
	<LoginCheck>
		<FullOrder id={props.query.id} />
	</LoginCheck>
);

export default FullOrderPage;
