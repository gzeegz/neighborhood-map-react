import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PlaceListItem from './place_list_item';

class PlaceList extends Component {
  constructor(props) {
    super(props);

    if (!this.props.places) {
      return (
        <div>
          Loading...
        </div>
      );
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedPlace != this.props.selectedPlace) {
      ReactDOM.findDOMNode(this._instance).scrollIntoView({block: "start", behavior: "smooth"});
    }
  }

  render() {
    const placeItems = this.props.places.map( place => {
      const selected = place === this.props.selectedPlace;
      let ref = null;
      if (selected) {
        ref = el => this._instance = el;
      }

      return (
        <PlaceListItem
          key={place.venue.id}
          place={place}
          selected={selected}
          ref={ref}
          onPlaceSelect={this.props.onPlaceSelect} />
      );
    });

    return (
      <ul className="list-group">
        {placeItems}
      </ul>
    );
  }
}

export default PlaceList;
