


import React, { useEffect, useState } from 'react';
import "./ebook.css";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import Catigories from "./categories_books/Categories";
import { Helmet } from 'react-helmet';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import solo from '../../../../public'





const Ebook = () => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [books, setBooks] = useState([])
  const navigate = useNavigate();
  // console.log(books)



  const images = [
    import.meta.env.BASE_URL + 's.jpg',
    import.meta.env.BASE_URL + 's2.jpg',
    import.meta.env.BASE_URL + 's3.jpg',
    import.meta.env.BASE_URL + 's4.jpg',
  ];




  useEffect(() => {
    // Automatically change the image every 3 seconds (adjust as needed)
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);



  const fetchBooks = async (url) => {
    try {
      const response = await axios.get(url);
      setDisplayedBooks(response.data);
      // console.log(response)
      setBooks(response.data)
    } catch (error) {
      console.error(`Error fetching books: ${error.message}`);
    }
  };


  useEffect(() => {
    fetchBooks('https://ogenduacademy.com/api/allbook/top-twenty')
  }, [])


  const handleViewClick = (bookId) => {
    // Navigate to the single page with the book's id
    navigate(`/books/single/${bookId}`);
  };




  // Calculate the index range for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the books to display on the current page
  const currentBooks = books.slice(startIndex, endIndex);

  // Function to handle page changes
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <Helmet>
        <title> Ogendu Academy Library </title>
      </Helmet>

      <div className="book_container">
        <div className="book_search">
        <div>
        <img src={images[currentImageIndex]} alt="" />
          </div>
          <div className='search_container'>
            <input
              type="text"
              placeholder=" Search by title, author, ISBN or subject"
            />
            <span className="search-icon">
              <SearchOutlinedIcon className="icon-search" />
            </span>
          </div>
          {/* <div>
            <li>
              <a href="#"> Search</a>
            </li>
          </div> */}
        </div>
        <div className="book_photo">
          <h1> (O-A-E) LIBRARY</h1>

        </div>
        <div className="secound_book_container">
          <div className="button_container">

            <li>
              <a onClick={() => fetchBooks('/api/allbook/top-twenty')} >Top Shelf</a>
            </li>

            <li>
              <a onClick={() => fetchBooks('/api/allbook/latest-books')} >New Book</a>
            </li>
      
            <li>
              <a onClick={() => fetchBooks('/api/allbook/trending')}>Trending</a>
            </li>

          </div>
          <div className="lower_book_container">
            {currentBooks.map((book, index) => (

              <div className="image_book" key={index}>
                <Link to={`https://ogenduacademy.com/books/single/${book._id}`}>
                  <img src={`https://ogenduacademy.com/uploads/${book.picture}`} alt={book.title} />

                </Link>
                <p className='book-title'>{book.title}</p>
                <p className='book-title'>${book.price}</p>

                <div className="container_details">
                </div>
              </div>
            ))}
            {/* Pagination */}
            <ReactPaginate
              pageCount={Math.ceil(books.length / itemsPerPage)}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        </div>
        <Catigories />
      </div>
    </>
  );
};

export default Ebook;
