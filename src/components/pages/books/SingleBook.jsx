import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from './CartSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingBag } from '@mui/icons-material';
import axios from 'axios';
import './single.css';

const SingleBook = () => {




  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isCartVisible, setCartVisible] = useState(false);



  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);


  
  const handleToggleCart = () => {
    setCartVisible(!isCartVisible);
  };

  

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://ogenduacademy.com/api/allbook/single-book/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error(`Error fetching book details: ${error.message}`);
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    fetchBookDetails();
  }, [id]);


  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product._id,
      title: product.title,
      // name: product.for,
      price: product.price,
      image: product.picture,
      quantity: 1,
    }));

    console.log(product.title)
  };



  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };



  const handleIncreaseQuantity = (product) => {
    dispatch(increaseQuantity(product));
  };


  const handleDecreaseQuantity = (product) => {
    dispatch(decreaseQuantity(product));
  };



  const handleClearCart = () => {
    localStorage.removeItem('cartItems');
    dispatch(clearCart());
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.price || 0;
      const itemQuantity = item.quantity || 0;
      return total + itemPrice * itemQuantity;
    }, 0);
  };

  const handleCheckout = () => {
    const totalPrice = getTotalPrice();
    navigate(`/user/checkout?amount=${totalPrice}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };




  return (

    <>

     <div className="cart-icon" onClick={handleToggleCart}>
        <ShoppingBag className='searchicon2' />
        <span className="cart-count">{cartItems.length >= 0 ? cartItems.length : 0}</span>
      </div>




      <div>
        {isCartVisible && (
          <div className="cart-container1">
            <div className="cart-content1">
              <h2>Cart</h2>
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((item) => (
                    <div className="item-each" key={item.id}>
                      <p>{item.title}</p>
                      <p>{console.log(item)}</p>
                      <img className="items-images" src={`/uploads/${item.image}`} alt="" />
                      <p>${item.price}</p>
                      <div className="buttons">
                        <button style={{background:"firebrick"}}  className="remove" onClick={() => handleRemoveFromCart(item)}>
                          Remove from Cart
                        </button>
                        <div className="inc-btn">
                          <button className="minus" onClick={() => handleDecreaseQuantity(item)}>-</button>
                          <span>{item.quantity}</span>
                          <button className="plus" onClick={() => handleIncreaseQuantity(item)}>+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="price">Total Price: ${getTotalPrice()}</p>
                  <button onClick={handleCheckout} className="checkout-button">
                    Checkout
                  </button>
                  <button style={{background:"firebrick"}} className="clear" onClick={handleClearCart}>Clear Cart</button>
                </>
              ) : (
                <p>No items in the cart</p>
              )}
            </div>
          </div>
        )}
      </div>




    <div className="single-book-container">
      {book ? (
        <>
          <h1 className="book-title1">{book.title}</h1>
          <div className="book-image">
            <img src={`/uploads/${book.picture}`} alt={book.title} />
          </div>
          <p className="book-author">Author: {book.author}</p>
          <p className="book-price">Price: ${book.price}</p>
          <button onClick={ () => handleAddToCart(book) } >add to cart</button>
          <p className="book-description">Description: {book.description}</p>
          {/* Add more details as needed */}
        </>
      ) : (
        <div className="loading-spinner"></div>
      )}
    </div>
    
    </>
  );
};

export default SingleBook;
