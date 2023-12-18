// BookList.js
import React, {useState} from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import FreeBook from './FreeBooks';

const books = [
  {
    id: 1,
    title: 'The Art of Programming',
    author: 'John Coder',
    description: 'Dive into the world of programming with this comprehensive guide. Learn best practices, design patterns, and master the art of writing efficient code.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_8CQ4wWSqtk0fKl_gD4qc0pFohLu2etmgwQ&usqp=CAU',
  },
  {
    id: 2,
    title: 'Data Science Essentials',
    author: 'Alice Scientist',
    description: 'Explore the fundamentals of data science and machine learning. This book covers data analysis, statistical modeling, and practical applications in real-world scenarios.',
    imageUrl: 'https://i0.wp.com/pctechmag.com/wp-content/uploads/2022/05/Data-Science.jpg?fit=1200%2C675&ssl=1',
  },
  {
    id: 3,
    title: 'Financial Freedom Handbook',
    author: 'Emma Investor',
    description: 'Unlock the secrets to financial success and independence. Discover investment strategies, budgeting tips, and practical advice to achieve your financial goals.',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIT3ojCAJGOuLpDWHrvxW88rP58fx_rccABQ&usqp=CAU',
  },
  {
    id: 4,
    title: 'The Art of Storytelling',
    author: 'Olivia Author',
    description: 'Master the art of storytelling and captivate your audience. This book covers narrative techniques, character development, and the essentials of creating compelling stories.',
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1373329529i/18167392.jpg',
  },
];
const BookList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BookList;