import React, { Component } from 'react';
import './Filter.css';

export class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: 'all', // Initialize selectedFilter to 'all'
      personalityArray: ["meerkat","panda"]
    };
  }

  handleFilterChange = (event) => {
    this.setState({ selectedFilter: event.target.value });
  }

  render() {
    const { partners } = this.props;
    const { startLocation, endLocation } = this.props;
    const { selectedFilter } = this.state;

    // Filter partners whose startpoint is "Dwarka" and endpoint is "Nanital"
    const filteredPartners = partners.filter(partner => (
      partner.startpoint === startLocation && partner.endpoint === endLocation
    ));

    // Sort filtered partners in descending order based on rating
    const sortedPartners = filteredPartners.slice().sort((a, b) => b.rating - a.rating);

    // Apply selected filter
    let filteredList;
    switch (selectedFilter) {
      case 'ratings':
        filteredList = sortedPartners;
        break;
      case 'solo':
        filteredList = filteredPartners.filter(partner => partner.type === "solo");
        break;
      case 'personality':
        filteredList = filteredPartners.sort((a, b) => {
          const countA = a.personality.filter(personality => this.state.personalityArray.includes(personality)).length;
          const countB = b.personality.filter(personality => this.state.personalityArray.includes(personality)).length;
          return countB - countA;
        });
        break;
      default:
        filteredList = partners;
    }

    return (
      <div className="filter-container">
        <label htmlFor="filter-select" className="filter-label">Show:</label>
        <select id="filter-select" className="filter-select" value={selectedFilter} onChange={this.handleFilterChange}>
          <option value="all">Show All Partners</option>
          <option value="ratings">Sort by Ratings</option>
          <option value="solo">Show Solo Partners</option>
          <option value="personality">Sort by Personality</option>
        </select>
        {filteredList && filteredList.length > 0 ? (
          <ul className="filtered-partner-list">
            {filteredList.map((partner, index) => (
              <li key={index} className="partner-item">
                {/* Render partner details */}
                <div className="partner-details">Name: {partner.name}</div>
                <div className="partner-details">Start Point: {partner.startpoint}</div>
                <div className="partner-details">End Point: {partner.endpoint}</div>
                <div className="partner-details">Type: {partner.type}</div>
                <div className="partner-details">Rating: {partner.rating}</div>
                <div className="partner-details">Date: {partner.date}</div>
                <div className="partner-details">Personality: {partner.personality.join(', ')}</div>

                {/* Add more fields as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-partners-message">No partners found</p>
        )}
      </div>
    );
  }
}

export default Filter;
