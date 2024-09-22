import React from 'react';
import "./UserProfile.css"

const UserProfile = () => {
  return (
    <div className="profile-container">
      <div className="profile-picture">
        <img src="profile-picture-url.jpg" alt="Profile" />
      </div>
      <div className="profile-info">
        <h2>User Name</h2>
        <div className="ratings">
          <p>Ratings: 4.5</p>
        </div>
        <div className="posts">
          <h3>Posts Posted</h3>
          <div className="post">
            <img src="post-image-url.jpg" alt="Post" />
            <div className="post-details">
              <p>Caption: Lorem ipsum dolor sit amet</p>
              <p>Likes: 20</p>
              <p>Comments: 5</p>
            </div>
          </div>
        </div>
        <div className="about">
          <h3>About</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et libero id est dapibus venenatis.</p>
        </div>
        <div className="places">
          <h3>Places Been To</h3>
          <p>Place 1, Place 2, Place 3</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
