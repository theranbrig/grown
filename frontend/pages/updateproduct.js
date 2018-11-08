import React from 'react';
import LoginCheck from '../components/LoginCheck';
import UpdateProduct from '../components/UpdateProduct';

const UpdateProductPage = props => (
	<LoginCheck>
		<UpdateProduct id={props.query.id} />
	</LoginCheck>
);

export default UpdateProductPage;
