import React from 'react';
import { Grid, Image, Container, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import HomeInformationBox from './HomeInformationBox';
import { MainPhoto, MainText, MainGrid } from './styles/HomeStyles';
import homeInformation from '../lib/homeInformation';

const Home = () => (
  <MainGrid>
    <Grid centered stackable>
      <Grid.Column centered="true" width={16} className="title-splash">
        <MainPhoto>
          <MainText>
            <div>
              <h1 size="huge">GROWN</h1>
            </div>
            <Image centered size="small" src="https://i.imgur.com/Gcwggjm.png" alt="Grown Logo" />
            <p>Farm to Table the Easy Way!</p>
          </MainText>
        </MainPhoto>
      </Grid.Column>
    </Grid>
    <Grid centered verticalAlign="middle" stackable container text="true">
      <Container className="sub-text">
        <h2>Learn about the best way to connect to farms in your area.</h2>
      </Container>
      {homeInformation.map(box => (
        <React.Fragment>
          <Divider />
          <HomeInformationBox
            header={box.header}
            subHeader={box.subHeader}
            information={box.information}
            image={box.image}
          />
        </React.Fragment>
      ))}
    </Grid>
  </MainGrid>
);

Grid.PropTypes = {
  centered: PropTypes.string,
};

export default Home;
