import styled from 'styled-components';

const MainGrid = styled.div`
  overflow-x: hidden;

  .two .column {
    padding: 30px;
  }
  .ui.container h2 {
    font-family: 'Michroma', sans-serif;
    padding: 20px 0 0;
  }
  div.sixteen.wide.column.title-splash {
    padding: 0px !important;
  }
  div.ui.centered.stackable.grid {
    margin: 0px;
  }
`;

const MainPhoto = styled.div`
  background: url('https://images.unsplash.com/photo-1505764706515-aa95265c5abc?ixlib=rb-0.3.5&s=33eb9de5e23b075714b44ea22f934d6e&auto=format&fit=crop&w=1052&q=80')
    no-repeat center;
  background-size: cover;
  height: 400px;
  width: 100%;
  position: relative;
  padding: 0;
`;

const MainText = styled.div`
  text-align: center;
  box-sizing: border-box;
  left: 20%;
  top: 25px;
  border: 15px white solid;
  height: 350px;
  margin: 0 auto;
  padding: 30px;
  color: ${props => props.theme.offWhite};
  position: absolute;
  background: hsla(0, 0%, 100%, 0.5);
  width: 60%;
  box-shadow: 5px 3px 30px black;
  overflow: hidden;
  @media (min-width: 375px) {
    padding: 10px 0;
    width: 80%;
    left: 10%;
  }
  h1 {
    font-family: 'Michroma', san-serif;
    letter-spacing: 0.2rem;
    color: ${props => props.theme.darkBlue};
    font-size: 5rem;
    text-shadow: 2px 2px 8px ${props => props.theme.offWhite};
    @media (max-width: 750px) {
      font-size: 3rem;
      padding: 12px 0;
    }
  }
  p {
    font-family: 'Michroma', sans-serif;
    letter-spacing: 0.2rem;
    color: ${props => props.theme.darkBlue};
    font-size: 2rem;
    text-shadow: 2px 2px 8px ${props => props.theme.offWhite};
    @media (max-width: 768px) {
      font-size: 1.3rem;
      width: 80%;
      margin-left: 10%;
    }
  }
`;

export { MainText, MainPhoto, MainGrid };
