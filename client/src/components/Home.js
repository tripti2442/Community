import React, { Component } from 'react';
import BuddySearch from './BuddySearch';
import Filter from './Filter';
import Add from './Add';
import Delete from './Delete';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [],
      startLocation: '',
      endLocation: '',
      showContent: false,
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
      [event.target.name]: event.target.value,
      showContent: false, // Reset showContent state when input changes
    });
  }

  handleSearch = () => {
    this.setState({ showContent: true });
  }

  render() {
    const { startLocation, endLocation, partners, showContent } = this.state;
    return (
      <div>
        {/* Navbar */}
        <nav className="navbar">
          <h1 className="logo">Travel Buddy</h1>
        </nav>

        {/* Main content area */}
        <div className="main-content">
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

          {/* Content area to show after search */}
          {showContent && (
            <div className="content-area">
              <h2 className="content-heading">Search Results</h2>
              {/* You can render the search results or other content here */}
            </div>
          )}

          {/* Add and delete section */}
          <div className="add-delete-section">
            <div className="add-section">
              <Add className="add-button" />
            </div>
            <div className="delete-section">
              <Delete className="delete-button" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
