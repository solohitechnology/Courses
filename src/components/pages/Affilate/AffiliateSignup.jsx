import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const AffiliateSignup = () => {
  return (
    <>
          <Helmet>
      <title>Ogendu AffiliateSignup</title>
        {/* Add other head elements like meta tags here */}
      </Helmet>
 
    <StyledAffiliateSignup>
      <SignupContainer>
        <SignupHeader>
          <Logo src="/ogendu-.png" alt="Logo" />
          <h2>Join Our Affiliate Program</h2>
        </SignupHeader>
        <SignupForm>
          <FormGroup>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" name="fullName" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </FormGroup>
          <SignupButton type="submit">Sign Up</SignupButton>
        </SignupForm>
        <SignupFooter>
          <p>Already have an account? <a href="/login-aff">Log In</a></p>
        </SignupFooter>
      </SignupContainer>
    </StyledAffiliateSignup>
    </>
  );
};

const StyledAffiliateSignup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  margin-top: 100px;
`;

const SignupContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 400px;
  text-align: center;
`;

const SignupHeader = styled.div`
  margin-bottom: 20px;

  h2 {
    color: #333;
  }
`;

const Logo = styled.img`
  width: 80px;
  height: auto;
  margin-bottom: 20px;
`;

const SignupForm = styled.form`
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
    color: #444;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff;
    }
  }
`;

const SignupButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const SignupFooter = styled.div`
  color: #666;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default AffiliateSignup;
