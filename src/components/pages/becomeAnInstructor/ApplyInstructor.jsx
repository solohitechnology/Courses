import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import './instructor.css'









const ApplyInstructor = () => {

  useEffect(() => {
    // Function to scroll to the top of the page
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Use 'smooth' for a smooth scrolling effect
      });
    };

    // Scroll to the top when the component mounts
    scrollToTop();
  }, []);


  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    expertise: '',
    bio: '',
    image: null, // Store the uploaded image
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: imageFile }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) {
      errors.fullName = 'Full Name is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.expertise) {
      errors.expertise = 'Expertise is required';
    }
    if (!formData.bio) {
      errors.bio = 'Bio is required';
    }
    if (!formData.image) {
      errors.image = 'Image is required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // Perform form submission or API call here, including the image
      const formDataWithImage = new FormData();
      formDataWithImage.append('fullName', formData.fullName);
      formDataWithImage.append('email', formData.email);
      formDataWithImage.append('expertise', formData.expertise);
      formDataWithImage.append('bio', formData.bio);
      formDataWithImage.append('image', formData.image);

      // Now you can send formDataWithImage to your API
      console.log('Form data submitted:', formDataWithImage);
    }
  };

  return (
    <>
    
    <Helmet>
      <title> Ogendu Academy Applyinstructor</title>
    </Helmet>

  
    <div className="apply-instructor">
      <h1>Apply to Become an Instructor</h1>
      <p>
        Are you ready to share your knowledge and expertise with students? Fill out the form below
        to apply for the instructor position.
      </p>
      <form onSubmit={handleSubmit} className="application-form">
        <label htmlFor="fullName">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
        {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {formErrors.email && <span className="error-message">{formErrors.email}</span>}

        <label htmlFor="expertise">Expertise</label>
        <input
          type="text"
          id="expertise"
          name="expertise"
          value={formData.expertise}
          onChange={handleInputChange}
          required
        />
        {formErrors.expertise && <span className="error-message">{formErrors.expertise}</span>}

        <label htmlFor="bio">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          rows="5"
          required
        />
        {formErrors.bio && <span className="error-message">{formErrors.bio}</span>}

        <label htmlFor="image">Upload Your Image</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        {formErrors.image && <span className="error-message">{formErrors.image}</span>}

        <button type="submit" className="submit-btn">
          Submit Application
        </button>
      </form>
    </div>
    </>
  );
};

export default ApplyInstructor;
