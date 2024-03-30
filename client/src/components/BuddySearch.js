import React, { Component } from 'react';

class BuddySearch extends Component {
  handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Access startLocation and endLocation from props
    const { startLocation, endLocation } = this.props;

    // Now you can use startLocation and endLocation variables
    console.log("Start Location:", startLocation);
    console.log("End Location:", endLocation);
  }

  render() {
    const { startLocation, endLocation, onInputChange } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="startLocation">Start from:</label>
          &nbsp; &nbsp;
          <input 
            type="text" 
            id="startLocation" 
            name="startLocation" 
            placeholder="Enter starting point location" 
            value={startLocation} 
            onChange={onInputChange} 
          />
          &nbsp; &nbsp;&nbsp; &nbsp;
          <label htmlFor="endLocation">Reach on:</label>
          &nbsp; &nbsp;
          <input 
            type="text" 
            id="endLocation" 
            name="endLocation" 
            placeholder="Enter ending point location" 
            value={endLocation} 
            onChange={onInputChange} 
          />
          &nbsp; &nbsp;&nbsp; &nbsp;
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default BuddySearch;
