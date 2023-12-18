// FreeBook.js
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './freebook.css';

const FreeBook = ({ title, author, description, imageUrl }) => {
  const downloadBook = () => {
    // Implement download logic here
    alert(`Downloading ${title}`);
  };

  const viewAsPDF = () => {
    // Implement PDF view logic here
    alert(`Viewing ${title} as PDF`);
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={imageUrl} alt={title} style={{height:"200px"}} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <div className="button-container">
          <Button style={{ background: 'skyblue', outline: 'none', border: 'none' }} onClick={downloadBook} className="mr-2">
            Download
          </Button>
          <Button variant="secondary" onClick={viewAsPDF}>
            View as PDF
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FreeBook;
