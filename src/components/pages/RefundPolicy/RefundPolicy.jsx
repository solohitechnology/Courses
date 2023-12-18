import React,{useEffect} from 'react';
import './RefundPolicy.css';
import { Helmet } from 'react-helmet';

const RefundPolicy = () => {
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

    <>
    
   <Helmet>
      <title> Ogendu Academy Refund Policy  </title>
    </Helmet>
    <div className="refund-policy-page">
      <h1>Refund Policy</h1>
      <p>
        At Ogendu Academy, we want you to be completely satisfied with your learning experience. If
        you are not satisfied with a course, you may request a refund within 30 days of your
        purchase.
      </p>
      <h2>Eligibility for Refund</h2>
      <ul>
        <li>You must have purchased the course directly from Ogendu Academy.</li>
        <li>Refunds are available for individual courses only, not for entire programs.</li>
        <li>You must not have completed more than 30% of the course content.</li>
        <li>The refund request must be made within 30 days of the original purchase date.</li>
      </ul>
      <h2>How to Request a Refund</h2>
      <p>
        To request a refund, please contact our support team at refund@ogenduacademy.com with your
        name, email address, and order number. We will process your refund as soon as possible.
      </p>
      <p>
        Please note that it may take 5-7 business days for the refund to appear in your account,
        depending on your payment method and financial institution.
      </p>
    </div>
    
    </>
  );
};

export default RefundPolicy;
