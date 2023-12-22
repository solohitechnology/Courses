import React, { useState } from 'react';
import axios from 'axios';

const BookUploadForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    image: null,
    pdf: null,
  });


  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, author, description, image, pdf } = formData;

    const data = new FormData();
    data.append('title', title);
    data.append('author', author);
    data.append('description', description);
    data.append('image', image);
    data.append('pdf', pdf);

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/books/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        console.log(response);
        // Handle success (optional)
        console.log('Book uploaded successfully');
      } else {
        // Handle errors
        console.error('Error uploading book:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading book:', error.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Upload a New Free Book</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input type="text" id="title" name="title" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author:</label>
          <input type="text" id="author" name="author" className="form-control" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea id="description" name="description" className="form-control" onChange={handleChange} required></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Upload Image:</label>
          <input type="file" id="image" name="image" className="form-control" accept="image/*" onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label htmlFor="pdf" className="form-label">Upload PDF:</label>
          <input type="file" id="pdf" name="pdf" className="form-control" accept=".pdf" onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
        <br />
      </form>
      <br />
    </div>
  );
};

export default BookUploadForm;
