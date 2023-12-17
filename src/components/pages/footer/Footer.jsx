


import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaWhatsapp, FaLinkedinIn, FaTiktok, FaTelegramPlane, FaPhone, FaEnvelope } from "react-icons/fa";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Link } from "react-router-dom";
import './footer.css'

const Footer = () => {
  const [blog, setBlog] = useState([]);
  const [subscription, setSubscription] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    getBlog();
  }, []);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  async function getBlog() {
    const response = await axios.get("https://ogenduacademy.com/api/blog/blog-posts");
    console.log(response.data);
    setBlog(response.data);
  }

  const subscribe = async () => {
    const response = await axios.post("https://ogenduacademy.com/api/sub/subscription", { email });
    console.log(response);
    setSubscription(response.data);
    setEmail("");
  };

  return (
    <>
      <section className="newletter">
        <div className="container subscription" >
          <div className="row">
            <div className="col-md-6">
              <h1 className="footer_head" >Subscribe with your email to receive the latest news and updates.</h1>
              <p>{subscription}</p>
            </div>
            <div className="col-md-6">
              <input
                type="email"
                placeholder="Enter email address"
                onChange={handleChange}
                required
                className="form-control send-email"
              />
              <Button
                variant="outline-primary"
                onClick={subscribe}
                startIcon={<SendOutlinedIcon />}
                className="mt-3"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="container">
          <div className="row footer_container">
            
            <div className="col-md-3">
              <h3>Explore</h3>
              <ul className="list-unstyled">
                <li><Link style={{textDecoration:"none", color:"black", fontWeight:"500"}} to="#">Instructors</Link></li>
                <li><Link  style={{textDecoration:"none", color:"black", fontWeight:"500"}}  to="/Accessibility">Accessibility</Link></li>
                <li><Link  style={{textDecoration:"none", color:"black", fontWeight:"500"}}  to="/RefundPolicy">Refund Policy</Link></li>
                <li><Link  style={{textDecoration:"none", color:"black", fontWeight:"500"}}  to="/AffiliateProgram">Affiliate Program</Link></li>
                <li><Link   style={{textDecoration:"none", color:"black", fontWeight:"500"}}  to="/BecomeInstructor">Become an Instructor</Link></li>
         
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Help & Support</h3>
              <ul className="list-unstyled">
                <li><Link  style={{textDecoration:"none", color:"black", fontWeight:"500"}}  to="/blog">our blog</Link></li>
                <li><Link  style={{textDecoration:"none", color:"black", fontWeight:"500"}}  to="/privacy">Privacy Policy</Link></li>
                <li><Link  style={{textDecoration:"none", color:"black", fontWeight:"500"}}  to="/service">Other Services</Link></li>
                <li><Link   style={{textDecoration:"none", color:"black", fontWeight:"500"}}  to="/studentssupport">Student Support</Link></li>
                <li><Link  style={{textDecoration:"none", color:"black", fontWeight:"500"}}  to="/instructorSupport">Instructor Support</Link></li>
              </ul>
            </div>
            <div className="col-md-3">
              <h3>Follow us</h3>
              <div className="social-icons">
                <a href="#" className="icon-link" style={{ color: "#1877f2", fontSize:"150%" }}><FaFacebook /></a>
                <a href="#" className="icon-link" style={{ color: "#ff0000",  fontSize:"150%"  }}><FaYoutube /></a>
                <a href="#" className="icon-link" style={{ color: "#bc2a8d",  fontSize:"150%"  }}><FaInstagram /></a>
                <a href="#" className="icon-link" style={{ color: "darkgreen",  fontSize:"150%"  }}><FaWhatsapp /></a>
                <a href="#" className="icon-link" style={{ color: "#000000",  fontSize:"150%"  }}><FaTiktok /></a>
                <a href="#" className="icon-link" style={{ color: "#0088cc",  fontSize:"150%"  }}><FaTelegramPlane /></a>
                <a href="#" className="icon-link" style={{ color: "#0077b5",  fontSize:"150%"  }}><FaLinkedinIn /></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2023 Ogenduacademy.com All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
