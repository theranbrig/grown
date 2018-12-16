import React from 'react';
import { Grid, Message, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import Link from 'next/link';

const LoggedInStyles = styled.div`
  position: relative;
  height: 550px;
  margin: 0 auto;
  margin-top: 80px;
  .ui.centered.grid > .column {
    text-align: center !important;
  }
`;

const LoggedIn = () => (
  <LoggedInStyles>
    <Grid container centered textAlign="center">
      <Grid.Column width={16}>
        <Image centered size="small" src="https://i.imgur.com/Gcwggjm.png" alt="Grown Logo" />
        <Message success header="You are signed in" content="Start exploring GROWN today." />
        <div>
          <Link href="/browse">
            <a>Browse Farms</a>
          </Link>
        </div>
      </Grid.Column>
    </Grid>
  </LoggedInStyles>
);

export default LoggedIn;
