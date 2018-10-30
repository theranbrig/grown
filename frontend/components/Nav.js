import Link from 'next/link';
import NavStyles from './styles/NavStyles';

const Nav = () => (
	<NavStyles className="navigation-bar">
		<Link href="/">
			<a>Home</a>
		</Link>
		<Link href="/browse">
			<a>Farms</a>
		</Link>
		{/*<Link href="/markets">
			<a>Markets</a>
		</Link>
		<Link href="/orders">
			<a>Orders</a>
		</Link>
		<Link href="/cart">
			<a>Cart</a>
		</Link> */}
	</NavStyles>
);

export default Nav;
