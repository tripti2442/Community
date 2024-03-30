import React, { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    userId:'',
    name: '',
    startpoint:'',
    endpoint:'',
    personality:[],
    type:'',
    visitingPoints:[],
    date: '' // New property for date
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Ensure that personality, visitingPoints, and date are handled correctly
    const updatedValue = name === 'personality' || name === 'visitingPoints' ? value.split(',') : name === 'userId' ? parseInt(value) : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/submitFormData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Form data submitted successfully');
        // Clear form data
        setFormData({
          userId:'',
          startpoint:'',
          endpoint:'',
          personality:[],
          type:'',
          visitingPoints:[],
          date: '' // Clear date as well
        });
        // Optionally handle success (e.g., show a success message)
      } else {
        console.error('Error submitting form data:', response.statusText);
        // Optionally handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Optionally handle error (e.g., show an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='userid'>User ID </label>
      &nbsp;&nbsp;
      <input type="number" name="userId" value={formData.userId} onChange={handleChange} placeholder="Your user id" id="userid"/>
      <br></br><br></br>
      <label htmlFor='startpoint'>Starting Point</label>
      &nbsp;&nbsp;
      <input type="text" name="startpoint" value={formData.startpoint} onChange={handleChange} placeholder="Your startpoint" id="startpoint"/>
      <br></br><br></br>
      <label htmlFor='endpoint'>End Point</label>&nbsp;&nbsp;
      <input type="text" name="endpoint" value={formData.endpoint} onChange={handleChange} placeholder="Your endpoint" id="endpoint"/>
      <br></br><br></br>
      <label htmlFor='triptype'>Trip Type</label>&nbsp;&nbsp;
      <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="Your Type" />
      <br></br><br></br>
      
      {/* Personality input field */}
      <label htmlFor='personality'>Your Personality </label>&nbsp;&nbsp;
      <input
        type="text"
        name="personality"
        value={formData.personality.join(',')}  
        onChange={handleChange}
        placeholder="Your Personality (comma-separated)"
        id="personality"
      />
      <br></br><br></br>

      {/* Visiting points input field */}
      <label htmlFor='visitingPoints'>Enter visiting points </label>&nbsp;&nbsp;
      <input
        type="text"
        name="visitingPoints"
        value={formData.visitingPoints.join(',')}  
        onChange={handleChange}
        placeholder="Your visiting points (comma-separated)"
      />
      <br></br><br></br>

      {/* Date input field */}
      <label htmlFor='date'>Date</label>&nbsp;&nbsp;
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        placeholder="Date"
      />
      <br></br><br></br>

      <button type="submit">Add</button>
    </form>
  );
};

export default FormComponent;







/*import React, { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    userId:'',
    name: '',
    startpoint:'',
    endpoint:'',
    personality:[],
    type:'',
    visitingPoints:[]
   
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Ensure that personality and visitingPoints are always arrays
    const updatedValue = name === 'personality' || name === 'visitingPoints' ? value.split(',') : name === 'userId' ? parseInt(value) : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/submitFormData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Form data submitted successfully');
        // Clear form data
        setFormData({
          userId:'',
          startpoint:'',
          endpoint:'',
          personality:[],
          type:'',
          visitingPoints:[]
        });
        // Optionally handle success (e.g., show a success message)
      } else {
        console.error('Error submitting form data:', response.statusText);
        // Optionally handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      // Optionally handle error (e.g., show an error message)
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='userid'>User ID </label>
      &nbsp;&nbsp;
      <input type="text" name="userId" value={formData.userId} onChange={handleChange} placeholder="Your user id" id="userid"/>
      <br></br><br></br>
      <label htmlFor='startpoint'>Starting Point</label>
      &nbsp;&nbsp;
      <input type="text" name="startpoint" value={formData.startpoint} onChange={handleChange} placeholder="Your startpoint" id="startpoint"/>
      <br></br><br></br>
      <label htmlFor='endpoint'>End Point</label>&nbsp;&nbsp;
      <input type="text" name="endpoint" value={formData.endpoint} onChange={handleChange} placeholder="Your endpoint" id="endpoint"/>
      <br></br><br></br>
      <label htmlFor='triptype'>Trip Type</label>&nbsp;&nbsp;
      <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="Your Type" />
      <br></br><br></br>
      
       {/* Personality input field *//*}
       <label htmlFor='personality'>Your Personality </label>&nbsp;&nbsp;
       <input
        type="text"
        name="personality"
        value={formData.personality.join(',')}  
        onChange={handleChange}
        placeholder="Your Personality (comma-separated)"
        id="personality"
      />
      <br></br><br></br>

      {/* Visiting points input field *//*}
      <label htmlFor='visitingPoints'>Enter visiting points </label>&nbsp;&nbsp;
      <input
        type="text"
        name="visitingPoints"
        value={formData.visitingPoints.join(',')}  
        onChange={handleChange}
        placeholder="Your visiting points (comma-separated)"
      />
      <br></br><br></br>
      <button type="submit">Add</button>
    </form>
  );
};

export default FormComponent;*/
