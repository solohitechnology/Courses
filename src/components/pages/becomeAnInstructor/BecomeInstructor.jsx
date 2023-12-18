import React,{useEffect} from 'react';
import './BecomeInstructor.css';

const BecomeInstructor = () => {
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


  return (
    <div className="become-instructor">
      <h1>Become an Instructor</h1>
      <p>
        Are you passionate about teaching and sharing your knowledge? Join our team of instructors
        and help educate students from around the world.
      </p>
      <div className="instructor-benefits">
        <h2>Why Become an Instructor?</h2>
        <ul>
          <li>Share your expertise and knowledge with a global audience.</li>
          <li>Earn revenue from your courses and get paid monthly.</li>
          <li>Join a community of educators and professionals.</li>
          <li>Access to our easy-to-use course creation platform.</li>
          <li>Dedicated support and resources to help you succeed.</li>
        </ul>
      </div>
      <div className="instructor-cta">
        <p>Ready to inspire and educate? Apply to become an instructor today!</p>
        <a href="/applyinstructor" className="instructor-btn">
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default BecomeInstructor;
