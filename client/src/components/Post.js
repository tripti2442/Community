import { useEffect, useState } from 'react';
import axios from 'axios';
import './Post.css';

function Post() {
  const [file, setFile] = useState();
  const [caption, setCaption] = useState('');
  const [userId, setUserId] = useState('');
  const [location, setLocation] = useState('');
  const [allImages, setAllImages] = useState([]);

  const handleUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', caption);
    formData.append('userId', userId);
    formData.append('location', location);

    axios.post('http://localhost:5000/upload', formData)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios.get('http://localhost:5000/getImage')
      .then(res => setAllImages(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="post-container">
      <div className="form-container">
        <form onSubmit={handleUpload}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <input type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
          <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <button type="submit" id="submitbutton">Upload</button>
        </form>
      </div>

      <div className="image-container">
        {allImages.map((img, index) => (
          <div key={index} className="image-details">
            <img src={`http://localhost:5000/Images/${img.image}`} alt={`Image ${index}`} />
            <p>Caption: {img.caption}</p>
            <p>User ID: {img.userId}</p>
            <p>Location: {img.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Post;
