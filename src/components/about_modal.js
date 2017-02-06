import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class AboutModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    $(ReactDOM.findDOMNode(this)).modal('show');
    $(ReactDOM.findDOMNode(this)).on('hidden.bs.modal', this.props.handleHideAboutModal);
  }

  render() {
    return (
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal"><span>&times;</span></button>
              <h4 className="modal-title">About</h4>
            </div>
            <div className="modal-body">
              <p>
                Neighborhood Picks is a map application showing suggested places from Foursquare. It is my first app using React. It was built using <a href="https://facebook.github.io/react/">React</a>, <a href="http://getbootstrap.com/">Bootstrap</a>, and <a href="https://www.mapbox.com/">Mapbox</a>. The template is from <a href="https://github.com/bmcbride/bootleaf">BootLeaf</a>.
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutModal;
