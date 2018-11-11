import Router from 'next/router';
import NProgress from 'nprogress';
import styled from 'styled-components';
import Nav from './Nav';
import Cart from './Cart';
import User from './User';

Router.onRouteChangeStart = () => {
	NProgress.start();
};

Router.onRouteChangeComplete = () => {
	NProgress.done();
};

Router.onRouteChangeError = () => {
	NProgress.done();
};

const Logo = styled.div`
	position: relative;
	z-index: 2;
	padding: 0;
	@media (max-width: 1300px) {
		margin: 0;
		text-align: center;
		padding: 5px 0 0 5px;
`;

const StyledHeader = styled.header`
	.bar {
		border-bottom: 5px solid ${props => props.theme.darkBlue};
		display: grid;
		grid-template-columns: auto 1fr;
		justify-content: space-between;
		align-items: stretch;
		padding: 0px;
		@media (max-width: 1300px) {
			grid-template-columns: 1fr;
			justify-content: center;
		}
	}
	a#logo {
		height: 0px;
	}
	.bar img {
		width: 100px;
		@media (max-width: 1300px) {
			width: 150px;
		}
	}
	.sub-bar {
		display: grid;
		grid-template-columns: 1fr auto;
		border-bottom: 1px solid ${props => props.theme.darkBlue};
	}
`;

const Header = () => (
	<StyledHeader>
		<div>
			<Logo className="bar">
				<div>
					<a href="/">
						<img width="150" src="https://i.imgur.com/Gcwggjm.png" alt="Grown Logo" />
					</a>
				</div>
				<Nav />
			</Logo>
		</div>
		<User>{({ data: { me } }) => me && <Cart />}</User>
	</StyledHeader>
);

export default Header;
