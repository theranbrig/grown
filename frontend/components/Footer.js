import React from 'react';
import { Icon, Grid } from 'semantic-ui-react';
import FooterStyles from './styles/FooterStyles';

const Footer = () => (
  <FooterStyles>
    <Grid container>
      <Grid.Column width={8} className="text-info">
        <h4>GROWN - Farm to Table the Easy Way</h4>
        <p>
          Created by Theran Brigowatz {' @ '}
          <a target="_blank" rel="noopener noreferrer" href="https://theran.co">
            https://theran.co
          </a>
        </p>
        <p>&copy; 2018</p>
      </Grid.Column>
      <Grid.Column width={8} textAlign="right">
        <ul>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com/theranbrig">
              <Icon name="github" />
            </a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://linkedin/in/theran-brigowatz">
              <Icon name="linkedin" />
            </a>
          </li>
          <li>
            <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/wellBuilt">
              <Icon name="twitter" />
            </a>
          </li>
        </ul>
      </Grid.Column>
    </Grid>
  </FooterStyles>
);

export default Footer;
