import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import FreeBook from './FreeBooks';

const BookList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Fetch books from the server when the component mounts
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books/allbook');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (pdfUrl, title) => {
    // Create a link element
    const link = document.createElement('a');
    link.href = `http://localhost:5000/api/books/download/${encodeURIComponent(pdfUrl)}`;
    link.download = `${title.replace(/ /g, '_')}.pdf`; // Replace spaces with underscores
  
    // Append the link to the document
    document.body.appendChild(link);
  
    // Trigger a click on the link to start the download
    link.click();
  
    // Remove the link from the document
    document.body.removeChild(link);
  };
  

  return (
    <Container>
      <br />
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by book name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form>
      <Row>
        {filteredBooks.map((book) => (
          <Col key={book.id}>
            <FreeBook {...book} />
            <Button variant="primary" onClick={() => handleDownload(book.pdfUrl, book.title)}>
              Download PDF
            </Button>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BookList;
