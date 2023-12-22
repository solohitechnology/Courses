import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './seminar.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios'
import { Helmet } from 'react-helmet';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong. Please try again later.</p>;
    }

    return this.props.children;
  }
};



const SeminarList = () => {

  const [seminars, setSeminars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/confrence/seminar');
    setSeminars(response.data);
    console.log(response)
  } catch (error) {
    console.error('Error fetching seminars:', error);
  } finally {
    setIsLoading(false);
  }

  AOS.init({ duration: 1000 });
}, []); 


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (isLoading) {
    return <p style={{ paddingLeft: '100px' }}>Loading seminars...</p>;
  }

  return (
    <ErrorBoundary>
      <>
        <Helmet>
          <title>Ogendu Academy Seminar</title>
        </Helmet>
        <div className="seminar-list-container">
          <legend style={{ color: 'black', background: 'skyblue', borderRadius: '5px', padding:"5px" }}>
            <marquee behavior="" direction="">
              <h1 style={{ color: 'black' }}>
                | Conferences | Seminars | Workshops | Webinars | Call for papers | Call for book chapters and
                authors contribution|
              </h1>
            </marquee>
          </legend>

          {seminars.length > 0 ? (
            <div data-aos="fade-left" className="seminar-slider">
              <div className="seminar-grid">
                {seminars.map((seminar) => (
                  <div key={seminar._id} className="seminar-item">
                    <h2>{seminar.title}</h2>
                    {seminar.picture && (
                      <img src={`https://ogenduacademy.com/uploads/${seminar.picture.filename}`} alt="Seminar" />
                    )}
                    <Link to={`/seminar/${seminar._id}`} className="register-link">
                      <button style={{ background: 'skyblue', color: 'black', fontWeight:"700", margin:"10px" }}>Register</button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>No seminars found.</p>
          )}
        </div>
      </>
    </ErrorBoundary>
  );
};

export default SeminarList;
