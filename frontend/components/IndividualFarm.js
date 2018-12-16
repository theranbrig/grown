import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Loader, Grid, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import MapContainer from './FarmMap';
import StyledFarmInfo from './styles/IndividualFarmStyles';
import User from './User';
import DeleteFarmButton from './DeleteFarmButton';
import Store, { PRODUCTS_QUERY } from './Store';
import CreateProduct from './CreateProduct';

const INDIVIDUAL_FARM_QUERY = gql`
  query INDIVIDUAL_FARM_QUERY($id: ID!) {
    farm(where: { id: $id }) {
      id
      name
      tagline
      description
      location
      phone
      email
      image
      user {
        id
      }
    }
  }
`;

const IndividualFarm = props => (
  <User>
    {({ data: { me } }) => (
      <Query query={INDIVIDUAL_FARM_QUERY} variables={{ id: props.id }} pollInterval={1000 * 60 * 5}>
        {({ data, loading, error }) => {
          if (loading) return <Loader active inline />;
          if (error) return <p>Error...</p>;
          const { farm } = data;
          return (
            <StyledFarmInfo>
              <div className="farm-header">
                <h2>{farm.name}</h2>
                <h3>Explore and Shop</h3>
              </div>
              <Grid container>
                <Grid.Row>
                  <Grid.Column mobile={16} computer={8}>
                    <Image src={farm.image} alt={farm.name} centered />
                    <h3>{farm.tagline}</h3>
                    <Query query={PRODUCTS_QUERY} variables={{ farmId: farm.id }} pollInterval={1000 * 60 * 5}>
                      {/* eslint-disable-next-line no-shadow */}
                      {({ data, error }) => (
                        <ul>
                          {data.products.slice(0, 5).map(product => (
                            <li key={product.id}>{product.name}</li>
                          ))}
                        </ul>
                      )}
                    </Query>
                  </Grid.Column>
                  <Grid.Column mobile={16} computer={8}>
                    <div className="info-box">
                      <div className="text-info">
                        <h4>{farm.name}</h4>

                        <p>
                          <Icon name="map" />
                          {farm.location}
                        </p>
                        <p>{farm.description}</p>
                        <div className="phone-email">
                          <Icon name="mail" />
                          <a href={`mailto:${farm.email}`}>{farm.email}</a>
                        </div>
                        <div className="phone-email">
                          <Icon name="phone" />
                          <a href={`tel:${farm.phone}`}>{farm.phone}</a>
                        </div>
                      </div>
                      <MapContainer location={farm.location} name={farm.name} />
                    </div>
                    {me && me.id === farm.user.id && (
                      <div className="edit-farm-link">
                        <Link
                          href={{
                            pathname: '/updatefarm',
                            query: { id: farm.id },
                          }}
                        >
                          <a>
                            <Icon name="edit" />
                            Edit Farm Information
                          </a>
                        </Link>
                        <DeleteFarmButton id={farm.id} />
                      </div>
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Grid container centered>
                <Grid.Column width={16}>
                  <Store id={farm.id} name={farm.name} />
                  {me && me.id === farm.user.id && <CreateProduct id={farm.id} />}
                </Grid.Column>
              </Grid>
            </StyledFarmInfo>
          );
        }}
      </Query>
    )}
  </User>
);

IndividualFarm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default IndividualFarm;
export { INDIVIDUAL_FARM_QUERY };
