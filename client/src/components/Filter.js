import React, { Component } from 'react';

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
      <div>
        <br></br>
        Show
        <select value={selectedFilter} onChange={this.handleFilterChange}>
          <option value="all">Show All Partners</option>
          <option value="ratings">Sort by Ratings</option>
          <option value="solo">Show Solo Partners</option>
          <option value="personality">Sort by Personality</option>
        </select>
        {filteredList && filteredList.length > 0 ? (
          <ul>
            {filteredList.map((partner, index) => (
              <li key={index}>
                {/* Render partner details */}
                <div>Name: {partner.name}</div>
                <div>Start Point: {partner.startpoint}</div>
                <div>End Point: {partner.endpoint}</div>
                <div>Type: {partner.type}</div>
                <div>Rating: {partner.rating}</div>
                <div>Personality: {partner.personality.join(', ')}</div>
                {/* Add more fields as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No partners found</p>
        )}
      </div>
    );
  }
}

export default Filter;
