import React, { Component } from 'react';
import User from './User';

class Orders extends Component {
	render() {
		return (
			<User>
				{({ data: me }) => {
          if(!me) return <p>You must login first!</p>
          <h1>Orders for {me.name}</h1>
            <ul>
              {me.order.id}
            </ul>
        }}
			</User>
		);
	}
}

export default Orders;
