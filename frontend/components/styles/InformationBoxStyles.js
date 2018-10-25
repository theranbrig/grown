import styled from 'styled-components';

const InformationBox = styled.div`
	font-family: 'Lato', sans-serif;
	margin: 0 auto;
	.ui.header {
		margin: 10px auto;
		text-align: center;
		font-family: 'Michroma', sans-serif;
	}
	h2.ui.header {
		color: ${props => props.theme.black};
		padding-top: 0 !important;
		padding-bottom: 10px !important;
		border-bottom: 2px solid ${props => props.theme.orange};
		width: calc(100% - 100px);
		font-size: 2.5rem;
	}
	p {
		width: 94%;
		margin-left: 3%;
		text-align: justify;
		font-size: 1.5rem;
		line-height: 2rem;
	}
`;
const ImageBox = styled.div`
	.ui.image {
		width: 80% !important;
		margin-left: 10% !important;
	}
`;

export { InformationBox, ImageBox };
