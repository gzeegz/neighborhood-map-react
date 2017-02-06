import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/nav_bar';
import SideBar from './components/side_bar';
import PlaceMap from './components/place_map';
import AboutModal from './components/about_modal';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAboutModal: false,
      showSidebar: true,
      location: [],
      places: [],
      filteredPlaces: [],
      selectedPlace: null
    };

    this.handleHideAboutModal = this.handleHideAboutModal.bind(this);
    this.handleShowAboutModal = this.handleShowAboutModal.bind(this);
    this.handleViewSidebar = this.handleViewSidebar.bind(this);

    this.placeSearch = this.placeSearch.bind(this);
    this.filterPlaces = this.filterPlaces.bind(this);

    this.placeSearch('San Francisco');
  }

  handleHideAboutModal(){
    this.setState({showAboutModal: false});
  }

  handleShowAboutModal(){
    this.setState({showAboutModal: true});
  }

  handleViewSidebar() {
    this.setState({showSidebar: !this.state.showSidebar});
  }

  placeSearch(term) {
    const Model = {};
    Model.api = {
      url: 'https://api.foursquare.com/v2/venues/explore',
      params: {
        'client_id': 'CI3L4FOSVIFWW3KDI31I4OKTUPYQIB2CGK1VYAWENKZSCJJY',
        'client_secret': 'YO4H3E52J2AIFVKPCMPCD0CXPOYY5I4REUZNC204FONRS2UC',
        'section': 'topPicks',
        'v': '20160801',
        'm': 'foursquare'
      }
    };
    Model.api.params.near = term;

    $.getJSON(Model.api.url, Model.api.params, data => {
        Model.meta = data.response;
        Model.results = data.response.groups[0].items;
        this.setState({
          location: [Model.meta.geocode.center.lng, Model.meta.geocode.center.lat],
          places: Model.results,
          filteredPlaces: Model.results
        });
    })
    .fail(() => {
      window.alert('Oops! There was a problem loading the data from Foursquare.');
    });
  }

  filterPlaces(term) {
    const places = this.state.places;
    const filteredPlaces = places.filter((place) => {
      return place.venue.name.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    });

    this.setState({
      filteredPlaces,
      selectedPlace: null
    });
  }

  render() {
    return (
      <div>
        <NavBar
          onSearchTermSubmit={this.placeSearch}
          handleShowAboutModal={this.handleShowAboutModal}
          handleViewSidebar={this.handleViewSidebar} />
        <SideBar
          isSidebarOpen={this.state.showSidebar}
          handleViewSidebar={this.handleViewSidebar}
          onFilterTermChange={this.filterPlaces}
          places={this.state.places}
          filteredPlaces={this.state.filteredPlaces}
          selectedPlace={this.state.selectedPlace}
          onPlaceSelect={selectedPlace => this.setState({selectedPlace})} />
        <PlaceMap
          isSidebarOpen={this.state.showSidebar}
          location={this.state.location}
          places={this.state.places}
          filteredPlaces={this.state.filteredPlaces}
          selectedPlace={this.state.selectedPlace}
          onPlaceSelect={selectedPlace => this.setState({selectedPlace})} />
        {this.state.showAboutModal ? <AboutModal handleHideAboutModal={this.handleHideAboutModal}/> : null}
      </div>
    );
  }
};

ReactDOM.render(<App />, document.querySelector('#app'));
