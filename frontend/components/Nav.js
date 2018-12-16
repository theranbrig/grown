import React from 'react';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { Icon } from 'semantic-ui-react';
import NavStyles from './styles/NavStyles';
import User from './User';
import { TOGGLE_CART_MUTATION } from './Cart';

const Nav = () => (
  <User>
    {({ data: { me } }) => (
      <NavStyles className="navigation-bar">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/browse">
          <a>Farms</a>
        </Link>
        {me && (
          <React.Fragment>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <button onClick={toggleCart} type="button">
                  <Icon name="shopping cart" /> {me.cart.reduce((tally, product) => tally + product.quantity, 0)}
                </button>
              )}
            </Mutation>
          </React.Fragment>
        )}
        {/* <Link href="/markets">
			<a>Markets</a>
			</Link>
			<Link href="/cart">
			<a>Cart</a>
		</Link> */}
        {!me && (
          <Link href="/login">
            <a>Login</a>
          </Link>
        )}
      </NavStyles>
    )}
  </User>
);

export default Nav;
