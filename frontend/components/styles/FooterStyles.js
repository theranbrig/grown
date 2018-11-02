import styled from 'styled-components';

const FooterStyles = styled.div`
	background: ${props => props.theme.regularBlue};
	border-top: 5px solid ${props => props.theme.darkBlue};
	color: ${props => props.theme.offWhite};
	padding: 20px 0;
	h4 {
		font-family: 'Michroma', sans-serif;
		letter-spacing: 0.1rem;
	}
	a {
		color: ${props => props.theme.orange};
		font-size: 2rem;
	}
	ul {
		display: inline-block;
	}
	ul li {
		display: inline-block;
	}
	.text-info a {
		font-size: 1rem;
	}
`;

export default FooterStyles;
