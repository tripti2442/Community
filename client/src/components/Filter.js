import React, { Component } from 'react';

export class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPartners: false,
      showSoloPartners: false,
      showPersonaPartners: false, // Initialize showPersonaPartners
      personalityArray: ["meerkat","panda"]
    };
  }

  togglePartners = () => {
    this.setState(prevState => ({
      showPartners: !prevState.showPartners // Toggle the state
    }));
  }

  toggleSoloPartners = () => {
    this.setState(prevState => ({
      showSoloPartners: !prevState.showSoloPartners // Toggle the state
    }));
  }

  togglepersonality = () => {
    this.setState(prevState => ({
      showPersonaPartners: !prevState.showPersonaPartners // Toggle the state
    }));
  }

  toggleAllPartners = () => {
    this.setState(prevState => ({
      showAllPartners : !prevState.showAllPartners  // Toggle the state
    }));

  }
  render() {
    const { partners } = this.props;
    const { startLocation , endLocation }=this.props;
    const { showPartners } = this.state;
    const { showSoloPartners } = this.state;
    const { showPersonaPartners }= this.state;
    const { showAllPartners  }=this.state;


    // Filter partners whose startpoint is "Dwarka" and endpoint is "Nanital"
    const filteredPartners = partners.filter(partner => (
      partner.startpoint === startLocation && partner.endpoint === endLocation
    ));

    
    
      // Sort filtered partners in descending order based on rating
    const sortedPartners = filteredPartners.slice().sort((a, b) => b.rating - a.rating);
     
    
     

    const soloPartners = showSoloPartners ? filteredPartners.filter(partner => partner.type === "solo") : filteredPartners;
    const personaPartners = filteredPartners.sort((a, b) => {
      const countA = a.personality.filter(personality => this.state.personalityArray.includes(personality)).length;
      const countB = b.personality.filter(personality => this.state.personalityArray.includes(personality)).length;
      // Partners with the most common personalities will appear first
      return countB - countA;
    });
    return (
      <div>
        <h2>FILTER</h2>

        {/*SHOWS ALL PARTNERS*/}
        <button onClick={this.toggleAllPartners}>
          {showAllPartners ? 'Hide All Partners' : 'Show All Partners'}
        </button>
        {showAllPartners && partners && partners.length > 0 ? (
          <ul>
            {partners.map((partner, index) => (
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




        {/*SHOWS PARTNERS SORTED ACCORDING TO RATINGS*/}
        <button onClick={this.togglePartners}>
          {showPartners ? 'Hide Ratings' : 'Show Ratings'}
        </button>

        {showPartners && sortedPartners && sortedPartners.length > 0 ? (
          <ul>
            {sortedPartners.map((partner, index) => (
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
          <p>No partners found with startpoint="Dwarka" and endpoint="Nanital"</p>
        )}


        {/*SHOWS PARTNERS SORTED ACCORDING TO TRAVELTYPE- SOLO*/}
        <button onClick={this.toggleSoloPartners}>
          {showSoloPartners ? 'Hide Solo Partners' : 'Show Solo Partners'}
        </button>
        
        {showSoloPartners && soloPartners && soloPartners.length > 0 ? (
          <ul>
            {soloPartners.map((partner, index) => (
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
          <p>No partners found with startpoint="Dwarka" and endpoint="Nanital"</p>
        )}

        {/*SHOWS PARTNERS SORTED ACCORDING TO COMMON PERSONALITY*/}
        <button onClick={this.togglepersonality }>
          {showPersonaPartners ? 'Hide personality' : 'Show personality'}
        </button>
        {showPersonaPartners && personaPartners && personaPartners.length > 0 ? (
          <ul>
            {personaPartners.map((partner, index) => (
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
