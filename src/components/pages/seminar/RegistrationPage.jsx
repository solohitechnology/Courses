import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './registration.css'

const RegistrationPage = () => {

  const { id } = useParams();
  const [massage, setMassage] = useState('')
  const [seminar, setSeminar] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });


  const [isRegistering, setIsRegistering] = useState(false);

  useEffect( async () => {
  
      try {
        const response = await axios.get(`/api/confrence/seminar/${id}`);
        setSeminar(response.data);
      } catch (error) {
        console.error('Error fetching seminar:', error);
      }
    

  }, [id]);




  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));


  };



  const handleRegister = async (event) => {
    event.preventDefault();
    setIsRegistering(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/confrence/seminar/${id}/register`,
        formData
      );
      setMassage(response.data.message)

      setFormData({
        name: '',
        email: '',
        phone: '',
      });
    } catch (error) {
      console.error('Error registering for seminar:', error);
    } finally {
      setIsRegistering(false);
    }
  };

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', 
      });
    };
    scrollToTop();
  }, []);


  if (!seminar) {
    return <p style={{ margin: "20%" }}>Loading seminar...</p>;
  }


  return (
    <Container>
      <Row>
        <div className="seminar_container">
          <Col md={8}>
            <h2 style={{ marginTop: "10%" }}>{seminar.title}</h2>
            <p className='content' style={{ lineHeight: '1.8' }}>
              {seminar.content}
            </p>

            {seminar.picture && (
              <img
                className='img-fluid'
                src={`/uploads/${seminar.picture.filename}`}
                alt="Seminar"
              />

            )}

          </Col>

          <Col md={4}>
            <Form onSubmit={handleRegister}>
              <Form.Group className='mb-3'>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>Phone:</Form.Label>
                <Form.Control
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <p style={{ color: 'darkgreen', fontWeight: 'bold' }}>{massage}</p>
              {isRegistering ? (
                'Registering...'
              ) : (
                <Button type='submit' variant='' style={{ marginBottom: "10%", background: "skyblue" }}>
                  Register
                </Button>
              )}
            </Form>
          </Col>

        </div>

      </Row>
    </Container>
  );
};

export default RegistrationPage;


