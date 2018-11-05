import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import User from './User';
import SignOut from './SignOut';

const Nav = () => (
	<User>
		{({ data: { me } }) => {
			console.log(me);
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
							<Link href="/browse">
								<a>ACCOUNT</a>
							</Link>
							<SignOut />
						</>
					)}
					{/*<Link href="/markets">
			<a>Markets</a>
			</Link>
			<Link href="/orders">
			<a>Orders</a>
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
