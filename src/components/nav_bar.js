import React from 'react';
import SearchBar from './search_bar';

const NavBar = props => {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>

          <a className="navbar-brand" href="#">Neighborhood Picks</a>
        </div>



        <div className="navbar-collapse collapse" id="navbar-collapse">
          <SearchBar
            onSearchTermSubmit={props.onSearchTermSubmit} />

          <ul className="nav navbar-nav">
            <li><a href="#" onClick={props.handleShowAboutModal}><i className="fa fa-question-circle white"></i>&nbsp;&nbsp;About</a></li>
            <li><a href="#" onClick={props.handleViewSidebar}><i className="fa fa-list white"></i>&nbsp;&nbsp;Picks List</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
