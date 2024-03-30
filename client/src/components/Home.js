import React, { Component } from 'react';
import Search from './Search';
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
      <div>
        {/* Pass startLocation, endLocation, and handleInputChange to child components */}
        <Search 
          startLocation={startLocation} 
          endLocation={endLocation} 
          onInputChange={this.handleInputChange} 
        />
        <Filter 
          startLocation={startLocation} 
          endLocation={endLocation} 
          partners={partners} 
        />

        <Add/> 
        <Delete/>    
      </div>
    );
  }
}

export default Home;
