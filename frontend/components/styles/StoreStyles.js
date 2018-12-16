import styled from 'styled-components';

const StoreStyling = styled.div`
  .ui.table thead th {
    background: ${props => props.theme.regularBlue} !important;
    color: white;
  }
  button {
    background: ${props => props.theme.lightBlue} !important;
    font-size: 1rem;
    width: 90%;
  }
  i {
    color: ${props => props.theme.darkBlue};
    font-size: 1.5rem;
    margin-right: 2px;
  }
  h2 {
    width: 80%;
    text-align: center;
  }
  .delete-button button {
    background: transparent !important;
    font-size: 1.5rem;
    width: 28px;
    padding: 0px 5px;
  }
  button.ui.icon.button {
    padding: 8px 0;
    i {
      font-size: 1.5rem;
    }
  }
`;

export default StoreStyling;
