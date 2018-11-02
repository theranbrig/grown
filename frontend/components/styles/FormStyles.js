import styled from 'styled-components';

const FormStyling = styled.div`
	width: 400px;
	max-width: 90%;
	margin: 100px auto 300px;
	text-align: center;
	ul {
		list-style-type: none;
		padding: 0;
		margin-top: 20px !important;
	}
	button {
		background: ${props => props.theme.lightBlue} !important;
		color: ${props => props.theme.darkBlue} !important;
		margin-top: 20px !important;
	}
	a {
		color: ${props => props.theme.regularBlue};
		font-size: 1.4rem;
	}
	li {
		margin-top: 10px !important;
	}
	label {
		margin-top: 20px !important;
	}
	span {
		font-family: 'Michroma', sans-serif;
		color: ${props => props.theme.darkBlue};
	}
`;

export default FormStyling;
