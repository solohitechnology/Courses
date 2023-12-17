import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css'
import CopyStudentsViewingContainer from '../courses/Courses';


function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Fetch courses from your API or data source
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses'); // Replace with your actual API endpoint
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  // Filter courses based on the search term
  const filteredCourses = courses?.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the filtered courses to display only the current page's items
  const currentCourses = filteredCourses?.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil((filteredCourses?.length || 0) / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Container className="custom-container">
        <Row>
          <Col>
            <Form.Group controlId="search" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search by course name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row xs={1} sm={2} lg={3} className="course-row">
          {currentCourses?.map((course) => (
            <Col key={course?._id} className="course-row" style={{marginTop:"20px"}}>
              <Card>
                <Link to={`/view/${course.id}`} style={{ textDecoration: 'none', color: 'gray' }}>
                  <Card.Img variant="top" src={course.authorAvater} style={{ height: '200px' }} />
                  <Card.Body>
                    <Card.Title>{course?.title}</Card.Title>
                    <Card.Text
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxHeight: '6em',
                      }}
                    >
                      {course.description}
                    </Card.Text>
                  </Card.Body>
                </Link>
                <Card.Footer>
                  <h6>
                    {' '}
                    <i>By: </i>
                    {course.author}
                  </h6>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(page)}>
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </Row>
      </Container>
       <CopyStudentsViewingContainer /> 
    </>
  );
}

export default Dashboard;
