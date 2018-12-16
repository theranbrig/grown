import styled from 'styled-components';

const FormStyling = styled.div`
  width: 500px;
  max-width: 95%;
  margin: 70px auto 300px;
  text-align: center;
  input#price {
    text-align: right;
  }
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
  img {
    margin: 10px;
  }
  div.ui.success.message {
    margin-top: 10px;
  }
`;

export default FormStyling;
