/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import styled from 'styled-components';
import Geocode from 'react-geocode';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const MapDiv = styled.div`
  margin: 0 auto;
  padding: 20px 0;
  margin: 0 auto;
  left: -3px;
  height: 300px;
`;

class MapContainer extends React.Component {
  state = {
    lat: 0,
    lng: 0,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  componentDidMount() {
    Geocode.setApiKey(publicRuntimeConfig.GOOGLE_GEOCODE_API_KEY);
    Geocode.enableDebug();
    Geocode.fromAddress(this.props.location).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({ lat, lng });
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    const style = {
      height: '250px',
      width: '90%',
      display: 'block',
      border: '2px solid #dda01d',
      margin: '0 auto',
      left: '5px',
      position: 'relative',
    };

    const divStyle = {
      position: 'relative',
    };
    return (
      <MapDiv style={divStyle}>
        <Map
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.long,
          }}
          zoom={15}
          onClick={this.onMapClicked}
          center={new google.maps.LatLng(this.state.lat, this.state.lng)}
        >
          <Marker
            position={{ lat: this.state.lat, lng: this.state.lng }}
            onClick={this.onMarkerClick}
            name={this.props.name}
          />
          <InfoWindow onClose={this.onInfoWindowClose} visible>
            <div>
              <h1>{this.props.name}</h1>
            </div>
          </InfoWindow>
        </Map>
      </MapDiv>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: publicRuntimeConfig.GOOGLE_MAPS_API_KEY,
})(MapContainer);
