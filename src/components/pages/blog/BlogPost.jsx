import React from "react";
import "./blogpost.css";
import { Link } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import { AiOutlineClockCircle } from "react-icons/ai";

const staticBlogs = [
  {
    _id: 1,
    title: "Cyber security",
    picture: "com.jpg",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2023-01-01", // Replace with an actual date
    author: "John Doe",
  },
  {
    _id: 2,
    title: "Computer science",
    picture: "cy.jpg",
    content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: "2023-02-01", // Replace with an actual date
    author: "Jane Doe",
  },

  // Add more static blog data as needed
];

const BlogPost = () => {
  // Use static data instead of making a request to the backend
  const [blogs, setBlogs] = React.useState(staticBlogs);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
    <Container>

    <h2 style={{background:"", marginTop:"20px", color:"gray", boxShadow:" 0 2px 4px rgba(218, 211, 211, 0.3)", padding:"10px", textAlign:"center", fontFamily:"sans-serif"}}>Blog Posts</h2>
   
    </Container>
      <section className="blog">

        {blogs.length > 0 ? (
          blogs.map((item) => (
            <li key={item._id}>
              <Link to={`/details/${item._id}`}>
                <div className="box boxItems">
                  <img
                    className="image_blog"
                    src={`/${item.picture}`}
                    alt="Blog Post"
                  />

                  <div className="details">
                    <h3>{item.title}</h3>
                    {/* Check if item.content is defined before rendering */}
                    {/* {item.content && (
                 <div
                   dangerouslySetInnerHTML={{ __html: marked(item.content) }}
                 />
               )} */}
                    <div className="date">
                      <AiOutlineClockCircle className="icon" />
                      <label htmlFor="">{formatDate(item.date)}</label>
                      {/* Use formatDate to display the formatted date */}
                    </div>
                    <p>Author: {item.author}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </>
  );
};

export default BlogPost;
