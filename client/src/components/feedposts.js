// HomeFeed.js

import React from 'react';
import './feedposts.css';

const HomeFeed = () => {
  // Sample data for demonstration
  const posts = [
    {
      id: 1,
      userId: 'user123',
      location: 'New York',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg/800px-View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_%28cropped%29.jpg',
      caption: 'Beautiful view of the city skyline!',
      comments: ['Amazing!', 'Love this!', 'Great shot!'],
      likes: 25,
    },
    {
      id: 2,
      userId: 'user456',
      location: 'Paris',
      image: 'https://static01.nyt.com/images/2023/07/01/travel/22hours-paris-tjzf/22hours-paris-tjzf-videoSixteenByNineJumbo1600.jpg',
      caption: 'Exploring the streets of Paris!',
      comments: ['Looks like fun!', 'Paris is always a good idea.'],
      likes: 30,
    },
    // Add more posts as needed
  ];

  return (
    <div className="home-feed">
      {posts.map(post => (
        <div key={post.id} className="post">
          <div className="post-header">
            <span className="user-id">{post.userId}</span>
            <span className="location">{post.location}</span>
          </div>
          <img src={post.image} alt="Post" className="post-image" />
          <div className="post-details">
            <p className="caption">{post.caption}</p>
            <div className="comments">
              {post.comments.map((comment, index) => (
                <span key={index} className="comment">{comment}</span>
              ))}
            </div>
            <div className="actions">
              <button className="like-button">Like ({post.likes})</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeFeed;
