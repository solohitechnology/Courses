import React, { useState } from 'react';
import axios from 'axios';

const PostSeminar = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [picture, setPicture] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('picture', picture);

      const response = await axios.post('/api/confrence/seminar', formData);
      console.log(response.data);
      // Handle successful response
    } catch (error) {
      console.error('Error creating seminar:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setPicture(e.target.files[0])}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostSeminar;
