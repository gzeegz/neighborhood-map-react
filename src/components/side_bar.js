import React from 'react';
import FilterBar from './filter_bar';
import PlaceList from './place_list';

const SideBar = props => {
  return (
    <div id="sidebar" className={props.isSidebarOpen ? 'open' : ''}>

      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">
            Top Picks
            <button
              type="button"
              className="btn btn-xs btn-default pull-right"
              onClick={props.handleViewSidebar} >
              <i className="fa fa-chevron-left"></i>
            </button>
          </h3>
        </div>

        <div className="panel-body">
          <FilterBar
            onFilterTermChange={props.onFilterTermChange}
            places={props.places} />
        </div>
      </div>

      <div className="sidebar-list">
        <PlaceList
          places={props.filteredPlaces}
          selectedPlace={props.selectedPlace}
          onPlaceSelect={props.onPlaceSelect} />
      </div>

    </div>
  );
}

export default SideBar;
