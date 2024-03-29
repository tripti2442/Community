import React, { Component } from 'react';
import Search from './Search';
import Filter from './Filter';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [],
      users:'',
      startLocation: '',
      endLocation: '',
      formData: {
        userId:'',
        name: '',
        startpoint: '',
        endpoint: '',
        personality: [],
        type: '',
        rating: '',
        visitingPoints: []
      }
    };
  }

  componentDidMount() {
    this.fetchPartners();
    this.fetchUsers();
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

  fetchUsers = () => {
    fetch('/user')
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data});
      })
      .catch(error => {
        console.error('Error fetching users data:', error);
      });
}
  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }



 

  handleSubmit = (event) => {
    event.preventDefault();
    const { formData } = this.state;
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('New partner added:', data);
        this.fetchPartners(); // Refresh partners after adding new one
        // Reset form data
        this.setState({
          formData: {
            name: '',
            startpoint: '',
            endpoint: '',
            personality: [],
            type: '',
            
            visitingPoints: []
          }
        });
      })
      .catch(error => {
        console.error('Error adding new partner:', error);
      });
  }

  handleInputChangeForm = (event) => {
    const { name, value } = event.target;
    // If the field is visitingPoints, split the input value by commas to form an array
    const updatedValue = (name === 'visitingPoints' || name === 'personality') ? value.split(',').map(point => point.trim()) : value;

    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: updatedValue
      }
    }));
  }

  render() {
    const { startLocation, endLocation, partners ,formData} = this.state;
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
        <form onSubmit={this.handleSubmit}>
          {/* Input fields for the form */}
          <input
            type="integer"
            name="userId"
            placeholder="User Id"
            value={formData.userId}
            onChange={this.handleInputChangeForm}
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={this.handleInputChangeForm}
          />
          <input
            type="text"
            name="startpoint"
            placeholder="Start Point"
            value={formData.startpoint}
            onChange={this.handleInputChangeForm}
          />
          <input
            type="text"
            name="endpoint"
            placeholder="End Point"
            value={formData.endpoint}
            onChange={this.handleInputChangeForm}
          />
          <input
            type="text"
            name="personality"
            placeholder="Personality"
            value={formData.personality}
            onChange={this.handleInputChangeForm}
          />
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={this.handleInputChangeForm}
          />
          
          <input
            type="text"
            name="visitingPoints"
            placeholder="Visiting Points"
            value={formData.visitingPoints}
            onChange={this.handleInputChangeForm}
          />
          
          <button type="submit">Add Partner</button>
        </form>
       
      </div>
    );
  }
}

export default Home;
