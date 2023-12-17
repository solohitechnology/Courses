
import './home.css';
import Faq from '../pages/faq/Faq';
import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { WhatsApp, Facebook, Instagram, Twitter, } from "@material-ui/icons";
import { MailOutline, } from "@material-ui/icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pricing from '../pages/pricing/Pricing';
import Testimonial from '../pages/testimonal/Testimonal';
import SeminarList from '../pages/seminar/GetSeminar';
import BlogPost from '../pages/blog/BlogPost';
import Awrapper from '../pages/Wrapper/Wrapper';



const Home = () => {
    // Array of featured courses
    const [imageIndex, setImageIndex] = useState(0);

    const imageUrls = [
        'l14.png',
        'l15.jpg',
        'l1.jpg',
        'l8.jpg',
        "l9.jpg",
        // 'l12.png',
        'l11.png',
        'l13.jpg',
    ];

    // Function to change the image source
    const changeImage = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            changeImage();
        }, 5000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);


    const imageHeight = '70vh';

    const featuredCourses = [
        {
            id: 1,
            title: 'Books & Library',
            imageSrc: 'https://static01.nyt.com/images/2018/06/03/books/review/03GLASSIE-SUB/03GLASSIE-SUB-superJumbo.jpg',
            description: 'At , we believe in the magic of books and the transformative power of reading. Step into a world of imagination, knowledge, and discovery as we invite you to explore our extensive collection of literary treasures.',
            url: '/books-library', // Example URL for Books & Library
        },
        {
            id: 2,
            title: 'Special education',
            imageSrc: 'https://i0.wp.com/calmatters.org/wp-content/uploads/2020/03/ClaireLazaroFamily_specialneeds_courtesy_01.jpg?resize=780%2C579&ssl=1',
            description: 'Teachers are trained to provide specialized instruction tailored to the individual needs of students with disabilities. This may involve modified teaching methods, adapted materials, assistive technology, and additional support services.',
            url: '/special-education', // Example URL for Special Education
        },
        {
            id: 3,
            title: 'Certified Educators',
            imageSrc: 'https://cdn.vanderbilt.edu/vu-news/files/20190417220953/iStock-AC-teachers-vs-TC-teachers.jpg',
            description: 'At OGENDU ACADEMY, we take pride in providing top-notch education led by a team of highly qualified and certified teachers. Our commitment to excellence ensures that anyone receives the best possible learning experience.',
            url: '/certified-educators', // Example URL for Certified Educators
        },
    ];


    return (
        <>
            <div style={{ marginTop: "10px" }}>
                <Container>
                    <Card>
                        <Row>
                            <Col md={6}>
                                <Card.Img src={imageUrls[imageIndex]}
                                    style={{ height: window.innerWidth <= 768 ? '80vw' : imageHeight }}
                                />
                            </Col>
                            <Col md={6}>


                                <Card.Body style={{ marginTop: window.innerWidth > 768 ? '20%' : '0', }} >
                                    <h1 style={{ fontFamily: "sans-serif", fontSize: "200%" }} >Welcome to OGENDU ACADEMY and eLearning</h1>
                                    <p>Your gateway to online education</p>

                                    <Card style={{ background: "", border: "none" }}>

                                        <Button
                                            variant="primary"
                                            href="/courses"
                                            style={{
                                                backgroundColor: 'skyblue',
                                                border: 'none',
                                                outline: 'none',

                                                width: "60%",
                                                color: 'black',
                                                marginTop: window.innerWidth > 768 ? '20px' : '5px',
                                                transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                                            }}
                                            className="custom-button" // Added class for styling
                                        >
                                            Explore Courses
                                        </Button>

                                        <Button
                                            variant="primary"
                                            href="/login"
                                            style={{
                                                backgroundColor: 'skyblue',
                                                border: 'none',
                                                outline: 'none',
                                                color: 'black',
                                                width: "60%",
                                                marginTop: window.innerWidth > 768 ? '20px' : '5px',
                                                transition: 'background-color 0.3s ease', // Smooth transition for hover effect
                                            }}
                                            className="custom-button" // Added class for styling
                                        >
                                            Get Started
                                        </Button>

                                    </Card>


                                </Card.Body>


                                <Card.Footer style={{ marginTop: window.innerWidth > 768 ? '13%' : '0', }} >
                                    <div style={{ display: 'flex', background: "", justifyContent: "space-around" }}>
                                        <span>   <MailOutline style={{ fontSize: '220%', color: '#3498db' }} /> </span>
                                        <span> <WhatsApp style={{ fontSize: '220%', color: "green" }} /></span>
                                        <span> <Facebook style={{ fontSize: "220%", color: 'blue' }} /></span>
                                        <span>      <Instagram style={{ fontSize: '220%', color: '#405DE6' }} /> </span>
                                        <span>  <Twitter style={{ fontSize: '220%', color: '#1DA1F2' }} /></span>

                                    </div>
                                </Card.Footer>

                            </Col>
                        </Row>
                    </Card>

                    <Container className="mb-5">
                        <h2 style={{ fontFamily: "sans-serif", margin: "20px" }} className="text-center">We also offer</h2>
                        <Row>
                            {/* Map through the array of featured courses */}
                            {featuredCourses.map(course => (
                                <Col md={4} key={course.id}>
                                    <Card>
                                        <Card.Img variant="top" src={course.imageSrc} className="featured-image" />
                                        <Card.Body>
                                            <Card.Title>{course.title}</Card.Title>
                                            <Card.Text>{course.description}</Card.Text>
                                            <Button style={{ background: "skyblue", color: "black", border: "none", margin: "5px" }} href={course.url}>
                                                View
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </Container>
            </div>
            <SeminarList />
            <Awrapper />
            <Testimonial />
            <BlogPost />
            <Pricing />
            <Faq />
        </>
    );
}

export default Home;
