import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';
import CountryList from './Countries';

const EmailForm = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const amountFromParams = new URLSearchParams(location.search).get('amount');
    const exchangeRate = 100; // Replace with the actual exchange rate
    const amountInNGN = amountFromParams;
    setAmount(amountInNGN || '');

    setCountryList(CountryList);
  }, [location]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      amount,
      name,
      address,
      postalCode,
      city,
      country,
    };

    try {
      const response = await axios.post('/api/payment', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(response);
      window.location.href = response.data.paystackResponse;
    } catch (error) {
      console.error(error);
      // Handle the error appropriately
    }

    // console.log(`Email submitted: ${email}`);
  };

  return (
    <>
      <Helmet>
        <title>Ogendu-Academy | Payment page</title>
      </Helmet>

      <Container>
        <Card >


        <Row className="justify-content-center">
          <Col md={8}>
            <h2>Amount: ${amount}</h2>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  required
                  placeholder="Enter your name"
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                  placeholder="Enter your email address"
                />
              </Form.Group>

              <Form.Group controlId="address">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  type="text"
                  value={address}
                  onChange={handleAddressChange}
                  required
                  placeholder="Enter your address"
                />
              </Form.Group>

              <Form.Group controlId="postalCode">
                <Form.Label>Postal Code:</Form.Label>
                <Form.Control
                  type="text"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                  required
                  placeholder="Enter your postal code"
                />
              </Form.Group>

              <Form.Group controlId="city">
                <Form.Label>City:</Form.Label>
                <Form.Control
                  type="text"
                  value={city}
                  onChange={handleCityChange}
                  required
                  placeholder="Enter your city"
                />
              </Form.Group>

              <Form.Group controlId="country">
                <Form.Label>Country:</Form.Label>
                <Form.Control
                  as="select"
                  value={country}
                  onChange={handleCountryChange}
                  required
                >
                  {countryList.map((countryOption, index) => (
                    <option key={index} value={countryOption.value}>
                      {countryOption.label}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>${amount}</Form.Label>
              </Form.Group>

              <Button style={{ background: 'skyblue', margin:"10px" }} type="submit">
                Pay Now
              </Button>
            </Form>
          </Col>
        </Row>
        </Card>
      </Container>
    </>
  );
};

export default EmailForm;
