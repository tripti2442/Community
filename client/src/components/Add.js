import React, { useState } from 'react';

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
      <input type="text" name="userId" value={formData.userId} onChange={handleChange} placeholder="Your user id" />
      <input type="text" name="startpoint" value={formData.startpoint} onChange={handleChange} placeholder="Your startpoint" />
      <input type="text" name="endpoint" value={formData.endpoint} onChange={handleChange} placeholder="Your endpoint" />
      <input type="text" name="type" value={formData.type} onChange={handleChange} placeholder="Your Type" />
      
       {/* Personality input field */}
       <input
        type="text"
        name="personality"
        value={formData.personality.join(',')}  
        onChange={handleChange}
        placeholder="Your Personality (comma-separated)"
      />

      {/* Visiting points input field */}
      <input
        type="text"
        name="visitingPoints"
        value={formData.visitingPoints.join(',')}  
        onChange={handleChange}
        placeholder="Your visiting points (comma-separated)"
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default FormComponent;
