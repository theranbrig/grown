import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import SignOut from './SignOut';
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from './Cart';
import { Icon } from 'semantic-ui-react';

const Nav = () => (
	<User>
		{({ data: { me } }) => {
			return (
				<NavStyles className="navigation-bar">
					<Link href="/">
						<a>Home</a>
					</Link>
					<Link href="/browse">
						<a>Farms</a>
					</Link>
					{me && (
						<>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
							<Mutation mutation={TOGGLE_CART_MUTATION}>
								{toggleCart => (
									<button onClick={toggleCart}>
										<Icon name="shopping cart" />{' '}
										{me.cart.reduce((tally, product) => tally + product.quantity, 0)}
									</button>
								)}
							</Mutation>
						</>
					)}
					{/*<Link href="/markets">
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
			);
		}}
	</User>
);

export default Nav;
