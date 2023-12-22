// FreeBook.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './freebook.css';

const FreeBook = ({ title, author, description, imageUrl }) => {


  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={`/uploads/${imageUrl}`} alt={title} style={{height:"200px"}} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FreeBook;
