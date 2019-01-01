import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.orange};
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.orange};
  background: ${props => (props.highlighted ? '#f7f7f7' : 'white')};
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid ${props => (props.highlighted ? props.theme.orange : 'white')};
  img {
    margin-right: 10px;
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px ${props => props.theme.orange};
  }

  to {
    box-shadow: 0 0 10px 1px ${props => props.theme.orange};
  }
`;

const SearchStyles = styled.div`
  position: relative;
  border-bottom: 2px solid ${props => props.theme.darkBlue};
  input {
    font-family: 'Lato', sans-serif;
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 1.2rem;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
