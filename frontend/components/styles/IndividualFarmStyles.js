import styled from 'styled-components';

const StyledFarmInfo = styled.div`
  .farm-header {
    padding-top: 25px;
    background-color: ${props => props.theme.lightBlue};
    border-bottom: 2px solid ${props => props.theme.orange};
    text-align: center;
  }
  h2,
  h3 {
    padding: 0 0 15px 0;
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
    width: 100%;
    text-align: center;
  }
  h4,
  p,
  a {
    font-family: 'Lato', sans-serif;
  }
  h4 {
    font-size: 2.5rem;
    font-family: 'Michroma', sans-serif;
    letter-spacing: 0.1rem;
  }
  a {
    color: ${props => props.theme.regularBlue};
  }
  div.eight.wide.computer.sixteen.mobile.column {
    padding: 40px 0 0 !important;
  }
  div.text-info {
    margin-left: 10px;
    padding: 0 17px !important;
    font-family: 'Lato', sans-serif;
  }
  .text-info p,
  .text-info a {
    font-size: 1.5rem;
  }
  .info-box {
    min-height: 650px;
  }
  i {
    font-size: 1.5rem;
    margin-right: 10px;
    color: ${props => props.theme.regularBlue};
  }
  ul {
    list-style-type: none;
    text-align: center;
    font-size: 1.5rem;
    line-height: 3rem;
    padding: 0;
    margin: 0 auto;
    font-family: 'Lato', sans-serif;
  }
  .edit-farm-link {
    padding: 10px 0 10px 22px !important;
    font-size: 1.5rem;
    margin-left: 10px;
  }
  .phone-email {
    padding: 7px 0;
  }
  div.down-arrow {
    text-align: center;
    i {
      font-size: 4rem;
    }
  }
`;

export default StyledFarmInfo;
