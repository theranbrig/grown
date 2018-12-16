import styled from 'styled-components';

const OrdersStyling = styled.div`
  min-height: 600px;
  .order-header {
    background-color: ${props => props.theme.lightBlue};
    border-bottom: 2px solid ${props => props.theme.orange};
    text-align: center;
    padding: 40px 0;
    width: 100%;
    font-size: 1.3rem;
  }
  h2 {
    text-align: center;
    padding: 15px 0;
    font-family: 'Michroma', sans-serif;
    letter-spacing: 0.1rem;
    width: 50%;
    margin: 0 auto;
  }
  span {
    color: ${props => props.theme.darkBlue};
  }
  .order-list {
    padding: 60px 0;
    font-size: 1.5rem !important;
  }
  i {
    font-size: 1.5rem;
    padding-right: 5px;
    margin-right: 10px;
    color: ${props => props.theme.orange};
  }
  .list-icon {
    width: 50px;
    margin-right: 10px;
  }
  /* h3 {
		padding: 15px 0 0 15px;
	} */
  div.ui.segment {
    font-size: 1.25rem;
  }
  .item-id {
    font-size: 0.8rem;
  }
  .order-box {
    background: ${props => props.theme.darkBlue};
  }
  .ui.segment.order-price {
    font-size: 2rem;
  }
  th {
    background: ${props => props.theme.lightBlue} !important;
  }
  strong {
    color: ${props => props.theme.darkBlue};
  }
`;

export default OrdersStyling;
