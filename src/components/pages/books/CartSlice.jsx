import { createSlice } from '@reduxjs/toolkit';





const loadCartItems = () => {
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
};



const saveCartItems = (cartItems) => {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));   
};



const cartSlice = createSlice({


  name: 'cart',
  initialState: {
    items: loadCartItems(),
  },


  reducers: {


    addToCart: (state, action) => {
      const { id, title, price, image, quantity } = action.payload;
      console.log(title)
      const existingItem = state.items.find((item) => item.id === id);
    
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ id, title, image, price, quantity });
      }
      saveCartItems(state.items);
    },


    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      saveCartItems(state.items);
    },



    increaseQuantity: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.map((item) => {
        if (item.id === id) {
          // Create a new object with the updated quantity
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      saveCartItems(state.items);
    },
    


    decreaseQuantity: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.map((item) => {
        if (item.id === id && item.quantity > 1) {
          // Create a new object with the updated quantity
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      saveCartItems(state.items);
    },
    




    clearCart: (state) => {
      state.items = [];
      saveCartItems(state.items);
    },
    
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
