import { useEffect, useState } from "react";
import "./catigories.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

const Catigories = () => {
  const [categoriesBook, setCatigoriesBook] = useState([]);
  const [originalBooks, setOriginalBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("engineering");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const getCatigoriesBooks = async (url) => {
    try {
      const response = await axios.get(url);

      const booksWithTruncatedDescription = response.data.map((book) => ({
        ...book,
        description: truncateDescription(book.description, 20),
      }));

      setCatigoriesBook(booksWithTruncatedDescription);
      setOriginalBooks(booksWithTruncatedDescription); // Save the original list
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const truncateDescription = (description, maxWords) => {
    const words = description.split(' ');
    const truncatedWords = words.slice(0, maxWords);
    return truncatedWords.join(' ');
  };

  useEffect(() => {
    getCatigoriesBooks("/api/allbook/allbooks");
  }, []);

  const handleCategoryChange = (selectedValue) => {
    setSelectedCategory(selectedValue);
    filterBooks(selectedValue);
  };

  const filterBooks = (category) => {
    // Filtering based on the original list
    const filteredBooks = originalBooks.filter(
      (book) => book.category.toLowerCase() === category.toLowerCase()
    );
    setCatigoriesBook(filteredBooks);
    setCurrentPage(1); // Reset to the first page when changing categories
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = categoriesBook.slice(indexOfFirstBook, indexOfLastBook);

  return (
    <>
      <div className="categories_container">
        <div className="catigories">
          <div className="left_catigories_container">
            {currentBooks?.map((book) => (
              <div className="book_container" key={book.id}>
                <Link to={`/books/single/${book._id}`}>
                  <div className="top_cat_container">
                    <div className="book_search_details">
                      <div className="book_image">
                        <img src={`/uploads/${book.picture}`} alt="" />
                      </div>
                      <div className="book_image_details">
                        <p className="book_title">{book.title}</p>
                        <p className="book_author"> <i>by:</i> {book.author}</p>
                        <p>{book.description}...</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="side_catigories">
            <div className="course-selector">
              <label className="select_text" htmlFor="courseType">Select a Course Type:</label>
              <select
                id="courseType"
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                style={{background:'', width:'100%'}}
              >
                <option value="engineering">Engineering</option>
                <option value="business">Business</option>
                <option value="medicine">Medicine</option>
                <option value="arts">Arts</option>
                <option value="science">Science</option>
                <option value="computerScience">Computer Science</option>
                <option value="law">Law</option>
                <option value="architecture">Architecture</option>
                <option value="environmentalScience">Environmental Science</option>
                <option value="psychology">Psychology</option>
                <option value="economics">Economics</option>
                <option value="socialWork">Social Work</option>
                <option value="technologies">Technologies</option>
                <option value="Health">Health</option>
                <option value="politicalScience">Political Science</option>
                <option value="Education">Education</option>
                <option value="communication">Communication</option>
                <option value="history">History</option>
              </select>
            </div>
          </div>
        </div>

        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={Math.ceil(categoriesBook.length / booksPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(selected) => setCurrentPage(selected.selected + 1)}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    </>
  );
};

export default Catigories;
