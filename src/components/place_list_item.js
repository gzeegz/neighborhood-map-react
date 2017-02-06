import React, {Component} from 'react';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class PlaceListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const place = this.props.place;

    // Create price tier
    let cost = '';
    if (place.venue.hasOwnProperty('price')) {
      const currency = place.venue.price.currency;
      const tier = place.venue.price.tier;
      // Price tier is indicated by number of repeated currency symbols.
      // For example, "$$$$" is very expensive.
      for (let price = currency; price.length <= tier; price += currency) {
        cost = price;
      }
    }

    // Create readable date string from number of seconds from Unix Epoch.
    const date = new Date(place.tips[0].createdAt * 1000);
    const tipCreatedAt = monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

    return (
      <li
        onClick={() => this.props.onPlaceSelect(place)}
        className={((this.props.selected) ? 'selected' : 'default')  + ' list-group-item'}>
          <div>
            <h4 className="pull-right" style={{color: '#' + place.venue.ratingColor}}>{place.venue.rating}</h4>
            <h4 className="place-name">{place.venue.name}</h4>
            <p className="place-category">{place.venue.categories[0].shortName + ((cost) ? ' • ' + cost : '')}</p>
            <address>
              {place.venue.location.formattedAddress[0]} <br />
              {place.venue.location.formattedAddress[1]}
            </address>

            {place.hasOwnProperty('tips') &&
              <div>
                <h4 className="place-tip-label">Tip:</h4>
                <p className="place-tip-user">
                  {place.tips[0].user.firstName} • {tipCreatedAt}
                </p>
                <p>
                  <a href={place.tips[0].canonicalUrl}>{place.tips[0].text}</a>
                </p>
              </div>
            }

          </div>
      </li>
    );
  }
}

export default PlaceListItem;
