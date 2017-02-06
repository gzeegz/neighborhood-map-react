import React, {Component} from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };
  }

  render() {
    return (
      <form className="navbar-form navbar-right" onSubmit={event => this.onSearchTermSubmit(event)}>
        <div className="form-group has-feedback">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a location..."
            value={this.state.term}
            onChange={event => this.onSearchTermChange(event.target.value)} />
          <span className="fa fa-search form-control-feedback"></span>
        </div>
      </form>
    );
  }

  onSearchTermChange(term) {
    this.setState({term});
  }

  onSearchTermSubmit(event) {
    this.props.onSearchTermSubmit(this.state.term);
    event.preventDefault();
  }
}

export default SearchBar;
