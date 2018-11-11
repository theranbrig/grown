import styled from 'styled-components';

const CartStyles = styled.div`
	overflow-y: scroll;
	padding: 20px;
	position: relative;
	position: fixed;
	height: 100%;
	top: 0;
	right: 0;
	max-width: 70%;
	width: 500px;
	bottom: 0;
	transform: translateX(100%);
	transition: all 0.5s;
	box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
	z-index: 5;
	display: grid;
	grid-template-rows: auto 1fr auto;
	background: ${props => props.theme.offWhite};
	${props => props.open && `transform: translateX(0);`};
	header {
		border-bottom: 2px solid ${props => props.theme.orange};
		padding-bottom: 1rem;
	}
	footer {
		border-top: 10px double ${props => props.theme.black};
		margin-top: 1rem;
		padding-top: 1rem;
		display: grid;
		grid-template-columns: auto auto;
		align-items: right;
		p {
			margin: 0;
		}
		h3 {
			font-size: 2rem;
			font-weight: 900;
			text-align: right;
			width: 100%;
			margin-bottom: 20px;
		}
	}
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		overflow: scroll;
		width: 100%;
	}
	button {
		background: ${props => props.theme.lightBlue} !important;
		&:hover {
			box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2) !important;
		}
	}
	h2 {
		font-family: 'Michroma', sans-serif;
	}
	p {
		text-align: right;
		font-size: 1.5rem;
		margin-bottom: 5px;
	}
	div.item {
		padding-top: 15px !important;
		padding-bottom: 5px;
	}
	div.header {
		font-size: 1.5rem;
		padding: 5px 0;
	}
	div.description {
		font-size: 1.2rem;
	}
	button.signout-button {
		margin-top: 50px;
		width: 120px;
		height: 2rem;
		font-size: 0.8rem;
	}
	a {
		color: ${props => props.theme.regularBlue};
	}
	button.buy-button {
		background: ${props => props.theme.regularBlue} !important;
		font-family: 'Michroma', sans-serif !important;
		color: ${props => props.theme.orange};
		font-size: 1rem;
		height: 2.8rem;
		&:hover {
			color: #efa75f;
		}
	}
	.cart-item-buttons {
		text-align: right;
		padding-bottom: 5px !important;
	}
	@media (max-width: 750px) {
		p {
			font-size: 1.1rem;
		}
	}
`;

export default CartStyles;
