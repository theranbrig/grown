import styled from 'styled-components';

const NavStyles = styled.ul`
	margin-top: 0 !important;
	padding: 16px 0 0 0;
	display: flex;
	justify-self: end;
	font-size: 1.2rem;
	font-family: 'Michroma', sans-serif;
	@media (max-width: 700px) {
		padding: 8px 0 0;
	}
	a,
	button {
		padding: 0.5rem 1rem;
		display: flex;
		align-items: center;
		position: relative;
		text-transform: uppercase;
		font-size: 0.8em;
		background: none;
		border: 0;
		text-decoration: none;
		color: #093c64;
		cursor: pointer;
		@media (max-width: 700px) {
			font-size: 10px;
			padding: 0 10px;
		}
		&:before {
			content: '';
			width: 2px;
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			bottom: 0;
		}
		&:after {
			height: 2px;
			background: #dda01d;
			content: '';
			width: 0;
			position: absolute;
			transform: translateX(-50%);
			transition: width 0.6s;
			transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
			left: 50%;
			margin-top: 0.8rem;
			@media (min-width: 1300px) {
				margin-top: 1.3rem;
			}
		}
		&:hover,
		&:focus {
			outline: none;
			&:after {
				width: calc(100% - 60px);
			}
		}
	}
	@media (max-width: 1300px) {
		border-top: 1px solid ${props => props.theme.lightgrey};
		width: 100%;
		justify-content: center;
		font-size: 1rem;
		margin: 10px 0;
	}
`;

export default NavStyles;
