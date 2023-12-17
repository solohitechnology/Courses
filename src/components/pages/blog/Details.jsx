import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { marked } from "marked";
import { AiOutlineClockCircle } from "react-icons/ai";
import "./details.css"; // Import your CSS file

const Details = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch the individual blog post by ID
    axios
      .get(`/api/blog/blogs/${id}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blog details:", error);
      });
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



  return (
    <div className="custom-details-container">
      <div className="custom-details-box">
        <img
          className="custom-details-image"
          src={`/${blog.picture}`}
          alt="Blog Post"
        />

        <div className="custom-details-content">
          <h3 className="custom-details-title">{blog.title}</h3>
          {blog.content && (
            <div
              className="custom-details-markdown"
              dangerouslySetInnerHTML={{ __html: marked(blog.content) }}
            />
          )}
          <div className="custom-details-date">
            <AiOutlineClockCircle className="custom-details-icon" />
            <label className="custom-details-label" htmlFor="">
           { formatDate( blog.date)}
            </label>
          </div>
          <p className="custom-details-author">Author: {blog.author}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
