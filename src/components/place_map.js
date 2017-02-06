import React, {Component} from 'react';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3plZSIsImEiOiJjaXluOXkxdXkwMDB6MnFwYzVqZ3F3cTNmIn0.H2h8a8Ze28SrprBrTvU_5Q';

class PlaceMap extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this._mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-122.420679, 37.772537],
      zoom: 12,
    });

    this.markers = [];
    // display popup on clicked marker
    this.map.on('click', event => {
      const targetElement = event.originalEvent.target;
      for (const [index, marker] of this.markers.entries()) {
        const element = marker._element;
        if (targetElement === element || element.contains(targetElement)) {
          const selectedPlace = this.props.filteredPlaces[index];
          // only select place if place hasn't been selected
          if (this.props.selectedPlace != selectedPlace) {
            this.props.onPlaceSelect(selectedPlace);
            marker.togglePopup();
          }
          break;
        }
      }
    });

    this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  }

  componentDidUpdate(prevProps) {
    // resize map when sidebar opens or closes
    if (prevProps.isSidebarOpen !== this.props.isSidebarOpen) {
      this.map.resize();
      window.dispatchEvent(new Event('resize'));

    }
    // center map when location changes
    if (prevProps.location !== this.props.location) {
      this.map.easeTo({
        center: this.props.location
      });
      this.fitToBounds();
    }
    // show only markers of places that were filtered
    if (prevProps.filteredPlaces !== this.props.filteredPlaces) {
      if (this.markers) {
        // only create markers that have been filtered
        this.removeMarkers();
        // set this.markers to an empty array, so the array doesn't keep growing
        this.markers = [];
        this.createMarkersPopups();
      }
    }
    // toggle the marker of the selected place
    if (prevProps.selectedPlace !== this.props.selectedPlace) {
      if (this.props.selectedPlace) {
        const [lng, lat] = [
          this.props.selectedPlace.venue.location.lng,
          this.props.selectedPlace.venue.location.lat
        ];
        // search for selected marker and open its popup
        // close all other markers' popups
        for (const [index, marker] of this.markers.entries()) {
          if (lng == marker.getLngLat().lng && lat === marker.getLngLat().lat) {
            marker.togglePopup();
            this.fitToBounds();
          } else if (marker.getPopup().isOpen()) {
            marker.togglePopup();
          }
        }
      }
    }
  }

  fitToBounds() {
    // resize map to fit all the markers
    let coordinates = [];
    for (const place of this.props.places) {
      coordinates.push(
        [place.venue.location.lng, place.venue.location.lat]
      );
    }

    const bounds = coordinates.reduce((bounds, coord) => {
      return bounds.extend(coord)
    }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

    this.map.fitBounds(bounds, {padding: 40});
  }

  createMarkersPopups() {
    for (const place of this.props.filteredPlaces) {
      const popup = new mapboxgl.Popup({offset: [0, -32]})
        .setHTML(this.populatePopup(place));

      this.markers.push(
        new mapboxgl.Marker(undefined, {offset: [-16, -32]})
          .setLngLat([place.venue.location.lng, place.venue.location.lat])
          .setPopup(popup)
          .addTo(this.map)
      );
    }
  }

  populatePopup(place) {
    let cost = '';
    if (place.venue.hasOwnProperty('price')) {
      const currency = place.venue.price.currency;
      const tier = place.venue.price.tier;
      // price tier is indicated by number of repeated currency symbols
      // for example, "$$$$" is very expensive
      for (let price = currency; price.length <= tier; price += currency) {
        cost = price;
      }
    }
    let html = '<p class="place-name">' + place.venue.name + '</p>';
    html += '<p class="place-category">' + place.venue.categories[0].shortName + ((cost) ? ' • ' + cost : '') + '</p>';
    html += '<address>' + place.venue.location.formattedAddress[0] + '<br>' + place.venue.location.formattedAddress[1] + '</address>';
    return html;
  }

  removeMarkers() {
    for (const marker of this.markers) {
      marker.remove();
    }
  }

  render() {
    return (
      <div
        id="map"
        className={this.props.isSidebarOpen ? 'open' : ''}
        ref={el => this._mapContainer = el}>
      </div>
    );
  }
}

export default PlaceMap;
