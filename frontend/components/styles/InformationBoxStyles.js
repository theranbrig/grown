import styled from 'styled-components';

const InformationBox = styled.div`
	font-family: 'Lato', sans-serif;
	color: ;
	.ui.header {
		margin: 10px auto;
		text-align: center;
		font-family: 'Michroma', sans-serif;
	}
	h2.ui.header {
		color: ${props => props.theme.black};
		padding-bottom: 10px !important;
		border-bottom: 2px solid ${props => props.theme.orange};
		width: calc(100% - 100px);
		font-size: 2.5rem;
	}
`;

export default InformationBox;
