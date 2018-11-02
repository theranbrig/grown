import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from '../components/Header';
import Meta from '../components/Meta';
import Footer from './Footer';


const theme = {
	darkBlue: '#093C64',
	regularBlue: '#476b97',
	orange: '#dda01d',
	lightBlue: '#dcf2ff',
	black: '#232323',
	offWhite: '#fefefe'
};

const StyledPage = styled.div`
	background: ${props => props.theme.offWhite};
	color: ${props => props.theme.black};
`;

const Inner = styled.div`
	max-width: ${props => props.theme.maxWidth};
	margin: 0 auto;
	padding-bottom: 30px;
`;

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

class Page extends Component {
	render() {
		return (
			<ThemeProvider theme={theme}>
				<StyledPage>
					<Meta />
					<Header />
					<div />
					<Inner>{this.props.children}</Inner>
					<Footer />
				</StyledPage>
			</ThemeProvider>
		);
	}
}

export default Page;
