import styled from 'styled-components';

const FarmInfo = styled.div`
	position: relative;
	width: 94%;
	border: 2px solid ${props => props.theme.darkBlue};
	left: 3%;
	text-align: center;
	img {
		max-height: 250px;
		width: 100% !important;
		margin: 0;
	}
	button {
		color: ${props => props.theme.darkBlue} !important;
		width: 100%;
		border-radius: 0 !important;
		background-color: ${props => props.theme.lightBlue} !important;
	}
	.farm-info {
		display: inline-block;
		text-align: left;
		position: absolute;
		top: 0;
		left: 0;
		width: 70%;
		color: ${props => props.theme.offWhite};
		text-shadow: 1px 1px 2px ${props => props.theme.black};
		h3 {
			width: 100%;
			margin: 0 0 0 10px;
			font-family: 'Michroma', sans-serif !important;
			font-size: 1.5rem;
			padding: 10px 0;
			letter-spacing: 0.15rem;
			line-height: 2rem;
			border-bottom: 2px solid ${props => props.theme.orange};
		}
		h4,
		p {
			margin: 0;
			padding: 0 0 0 10px;
			font-family: 'Lato', sans-serif;
			font-size: 1.2rem;
			letter-spacing: 0.05rem;
			line-height: 2rem;
		}
	}
`;

const MainArea = styled.div`
	text-align: center;
	h2,
	h3 {
		padding: 0 0 20px 0;
		font-family: 'Michroma', sans-serif;
		letter-spacing: 0.1rem;
		width: 50%;
		margin: 0 auto;
	}
	h2 {
		border-bottom: 2px solid ${props => props.theme.orange};
	}
	h3 {
		padding: 20px 0 30px;
		border-bottom: none;
	}
	span {
		color: ${props => props.theme.darkBlue};
	}
	.browse-header {
		padding-top: 30px;
		background-color: ${props => props.theme.lightBlue};
		border-bottom: 2px solid ${props => props.theme.orange};
	}
`;

export { FarmInfo, MainArea };
