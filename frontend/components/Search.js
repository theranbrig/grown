import React from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/SearchStyles';

const SEARCH_FARMS_QUERY = gql`
  query SEARCH_FARMS_QUERY($searchTerm: String!) {
    farms(where: { OR: [{ name_contains: $searchTerm }, { location_contains: $searchTerm }] }) {
      id
      image
      name
      location
    }
  }
`;

function routeToItem(farm) {
  Router.push({
    pathname: '/farm',
    query: {
      id: farm.id,
    },
  });
}

class AutoComplete extends React.Component {
  state = {
    farms: [],
    loading: false,
  };

  onChange = debounce(async (e, client) => {
    console.log('Searching...');
    // turn loading on
    this.setState({ loading: true });
    // Manually query apollo client
    const searchString = e.target.value.toLowerCase();
    const res = await client.query({
      query: SEARCH_FARMS_QUERY,
      variables: { searchTerm: searchString },
    });
    this.setState({
      farms: res.data.farms,
      loading: false,
    });
  }, 250);

  render() {
    resetIdCounter();
    return (
      <SearchStyles>
        <Downshift onChange={routeToItem} itemToString={farm => (farm === null ? '' : farm.name)}>
          {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
            <div>
              <ApolloConsumer>
                {client => (
                  <input
                    {...getInputProps({
                      type: 'search',
                      placeholder: 'Search By Farm or Location - Search is case sensitive.',
                      id: 'search',
                      className: this.state.loading ? 'loading' : '',
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      },
                    })}
                  />
                )}
              </ApolloConsumer>
              {isOpen && (
                <DropDown>
                  {this.state.farms.map((item, index) => (
                    <DropDownItem {...getItemProps({ item })} key={item.id} highlighted={index === highlightedIndex}>
                      <img width="50" src={item.image} alt={item.name} />
                      {item.name.toUpperCase()} - {item.location.toUpperCase()}
                    </DropDownItem>
                  ))}
                  {!this.state.farms.length && !this.state.loading && (
                    <DropDownItem> Nothing Found {inputValue}</DropDownItem>
                  )}
                </DropDown>
              )}
            </div>
          )}
        </Downshift>
      </SearchStyles>
    );
  }
}

export default AutoComplete;
