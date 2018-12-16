import React from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import PropTypes from 'prop-types';
import Header from './Header';
import Meta from './Meta';
import Footer from './Footer';

const theme = {
  darkBlue: '#093C64',
  regularBlue: '#476b97',
  orange: '#dda01d',
  lightBlue: '#dcf2ff',
  black: '#232323',
  offWhite: '#fefefe',
};

const StyledPage = styled.div`
  background: ${props => props.theme.offWhite};
  color: ${props => props.theme.black};
  min-height: 100vh;
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding-bottom: 30px;
`;

// eslint-disable-next-line no-unused-expressions
injectGlobal`

	html {
		box-sizing: border-box;
	}
	*, *:before, *:after {
		box-sizing: inherit;
	}

	body {
		padding: 0;
		margin: 0;
	}
`;

const Page = props => (
  <ThemeProvider theme={theme}>
    <StyledPage>
      <Meta />
      <Header />
      <div />
      <Inner>{props.children}</Inner>
      <Footer />
    </StyledPage>
  </ThemeProvider>
);

Page.propTypes = {
  children: PropTypes.any.isRequired,
};

export default Page;
