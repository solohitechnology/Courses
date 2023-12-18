import React,{useEffect} from 'react';
import { Helmet } from 'react-helmet';
import './AffiliateProgram.css';

const AffiliateProgram = () => {

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
      <title>Ogendu Academy Affilation</title>
    </Helmet>
        
    <div style={{marginTop:"150px"}} className="affiliate-program">
      <h1>Affiliate Program</h1>
      <p>
        Welcome to our Affiliate Program! Earn commissions by promoting our courses and referring
        new students to our academy.
      </p>
      <div className="affiliate-details">
        <h2>How it Works</h2>
        <ul>
          <li>
            Sign up for our Affiliate Program and get a unique referral link to share with your
            audience.
          </li>
          <li>Share your referral link on your website, blog, social media, or newsletters.</li>
          <li>
            When someone clicks on your referral link and makes a purchase on our website, you earn
            a commission.
          </li>
          <li>Track your earnings and performance through your Affiliate Dashboard.</li>
          <li>Payouts are made on a monthly basis.</li>
        </ul>
      </div>
      <div className="affiliate-benefits">
        <h2>Affiliate Benefits</h2>
        <ul>
          <li>Generous commission rates on each successful referral.</li>
          <li>Access to a wide range of high-quality courses to promote.</li>
          <li>Marketing materials and banners to help you promote our academy.</li>
          <li>Dedicated support from our affiliate team.</li>
          <li>Opportunity to grow your income and audience through our partnership.</li>
        </ul>
      </div>
      <div className="affiliate-cta">
        <p>Ready to start earning? Join our Affiliate Program today!</p>
        <a href="/affiliatesignup" className="affiliate-btn">
          Sign Up Now
        </a>
      </div>
    </div>
    </>
  );
};

export default AffiliateProgram;
