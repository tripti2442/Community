import React, { Component } from 'react';

export class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false // Initially, the form is hidden
    };
  }

  toggleForm = () => {
    this.setState(prevState => ({
      showForm: !prevState.showForm // Toggle the form visibility
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userId = formData.get('userId');
    const startpoint = formData.get('startpoint');
    const endpoint = formData.get('endpoint');
    // Handle delete logic using the form data (userId, startpoint, endpoint)
    console.log('Deleting:', { userId, startpoint, endpoint });
    // Optionally, you can make a DELETE request to the server here
  };

  render() {
    const { showForm } = this.state;

    return (
      <div>
        <button onClick={this.toggleForm}>{showForm ? 'Hide Delete Form' : 'Show Delete Form'}</button>
        {showForm && (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor='userid'>UserId</label>
            &nbsp; &nbsp;
            <input type="text" name="userId" placeholder="Your user id" />
            <br></br><br></br>
            <label htmlFor='startpoint'>Startpoint</label>
            &nbsp; &nbsp;
            <input type="text" name="startpoint" placeholder="Your startpoint" />
            <br></br><br></br>
            <label htmlFor='endpoint'>End Point</label>
            &nbsp; &nbsp;
            <input type="text" name="endpoint" placeholder="Your endpoint" />
            <br></br><br></br>
            <button type="submit">Delete</button>
          </form>
        )}
      </div>
    );
  }
}

export default Delete;
