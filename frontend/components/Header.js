import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from './Nav';
import Cart from './Cart';
import User from './User';
import StyledHeader, { Logo } from './styles/HeaderStyles';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

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
