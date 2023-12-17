import React, { useState } from "react";
import { FaPhoneAlt, FaTwitter, FaUser } from "react-icons/fa";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { Nav, Navbar, Form, FormControl, NavDropdown } from "react-bootstrap";
import Home from "../home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./header.css"; // Make sure to import your custom styles

function HeaderPrimary() {
  const [showCoursesList, setShowCoursesList] = useState(false);

  const toggleCoursesList = () => {
    setShowCoursesList(!showCoursesList);
  };

  return (

    <>

      <div className="headerPrimary ">

        <Navbar className="navbar headerNavbar" expand="lg">
          <Navbar.Brand className="logo_mobile" href="/">
            <img src="./ogendu2.png" className="logo img-fluid" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline className="searchInput">
              <FormControl
                type="text"
                placeholder="What will you like to study?"
                className="searchBar form-control"
                onFocus={toggleCoursesList}
                onBlur={toggleCoursesList}
              />
              <div className="searchIcon">
                <SearchOutlinedIcon className="icon" />
              </div>
            </Form>
            <Nav className="links_nav">
              <Nav.Link href="/login">Get Started</Nav.Link>
              <Nav.Link href="/courses">View Courses</Nav.Link>
              <Nav.Link href="/books">E-Library</Nav.Link>
              <NavDropdown title="What we do" id="basic-nav-dropdown" style={{background:"skyblue", zIndex:"999", fontWeight:"500", fontFamily:"sans-serif" }}>
                <NavDropdown.Item href="#">Webinars</NavDropdown.Item>
                <NavDropdown.Item href="#">Workshops</NavDropdown.Item>
                <NavDropdown.Item href="#">Conferences</NavDropdown.Item>
                <NavDropdown.Item href="#">Upcoming Events</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#">Course Creation</NavDropdown.Item>
                <NavDropdown.Item href="#">Teaching Resources</NavDropdown.Item>
                <NavDropdown.Item href="#">Become an Instructor</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <div className="user-icon-container">
              <img src="/son.jpg" className="user-icon rounded-circle" alt="user-icon" />
            </div>
          </Navbar.Collapse>
        </Navbar>

        {showCoursesList && (
          <div className="courses_list">
            {/* ... (your existing code) */}
          </div>
        )}

      </div>
      {/* <Home /> */}


    </>
  );
}

export default HeaderPrimary;
