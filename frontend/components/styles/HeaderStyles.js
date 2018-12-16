import styled from 'styled-components';

const StyledHeader = styled.header`
  .bar {
    border-bottom: 5px solid ${props => props.theme.darkBlue};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    padding: 0px;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  a#logo {
    height: 0px;
  }
  .bar img {
    width: 100px;
    @media (max-width: 1300px) {
      width: 150px;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.darkBlue};
  }
`;

const Logo = styled.div`
	position: relative;
	z-index: 2;
	padding: 0;
	@media (max-width: 1300px) {
		margin: 0;
		text-align: center;
		padding: 5px 0 0 5px;
`;

export default StyledHeader;
export { Logo };
