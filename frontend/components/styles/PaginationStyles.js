import styled from 'styled-components';

const PaginationStyles = styled.div`
	font-family: 'Lato', sans-serif;
	text-align: center;
	display: inline-grid;
	grid-template-columns: repeat(4, auto);
	align-items: stretch;
	justify-content: center;
	align-content: center;
	margin: 2rem 0;
	border: 2px solid ${props => props.theme.orange};
	& > * {
		margin: 0;
		padding: 15px 30px;
		border-right: 2px solid ${props => props.theme.orange};
		&:last-child {
			border-right: 0;
		}
	}
	a[aria-disabled='true'] {
		color: grey;
		pointer-events: none;
	}
	a[aria-diaabled='false'] {
		color: ${props => props.theme.regularBlue};
	}
`;

export default PaginationStyles;
