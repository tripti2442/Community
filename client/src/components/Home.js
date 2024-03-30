import React, { Component } from 'react';
import BuddySearch from './BuddySearch';
import Filter from './Filter';
import Add from './Add';
import Delete from './Delete';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [],
      startLocation: '',
      endLocation: '',
    };
  }

  componentDidMount() {
    this.fetchPartners();
  }

  fetchPartners = () => {
    fetch('/api')
      .then(response => response.json())
      .then(data => {
        this.setState({ partners: data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { startLocation, endLocation, partners } = this.state;
    return (
      <div className="home-container">
        {/* Search and filter section */}
        <div className="search-filter-section">
          <BuddySearch
            startLocation={startLocation}
            endLocation={endLocation}
            onInputChange={this.handleInputChange}
          />
          <Filter
            startLocation={startLocation}
            endLocation={endLocation}
            partners={partners}
          />
        </div>

        {/* Add and delete section */}
        <div className="add-delete-section">
          <div>
            <h4>Add an invitation:</h4>
            <Add className="add-button" />
          </div>
          <div>
            <h4>Delete an invitation:</h4>
            <Delete className="delete-button" />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
