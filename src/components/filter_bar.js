import React, {Component} from 'react';

class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: ''
    };
  }

  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Filter by name..."
          value={this.state.term}
          onChange={event => this.onFilterInputChange(event.target.value)} />
      </div>
    );
  }


  onFilterInputChange(term) {
    this.setState({term});
    this.props.onFilterTermChange(term);
  }
}

export default FilterBar;
