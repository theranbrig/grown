import React from 'react';
import Orders from '../components/Orders';
import LoginCheck from '../components/LoginCheck';

const OrdersPage = props => (
	<LoginCheck>
		<Orders />
	</LoginCheck>
);

export default OrdersPage;
