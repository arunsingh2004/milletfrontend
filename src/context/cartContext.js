// CartContext.js
import React, { createContext, useContext, useState } from "react";

// Create a context object
const CartContext = createContext();

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// CartContextProvider component
export const CartContextProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const increaseCartCount = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  const decreaseCartCount = () => {
    if (cartCount > 0) {
      setCartCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        increaseCartCount,
        decreaseCartCount,
        setCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// // CartContext.js
// import React, { createContext, useContext, useState } from "react";

// // Create a context object
// const CartContext = createContext();

// // Custom hook to use CartContext
// export const useCart = () => {
//   return useContext(CartContext);
// };

// // CartContextProvider component
// export const CartContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [cartCount, setCartCount] = useState(0);

//   const increaseCartCount = () => {
//     setCartCount((prevCount) => prevCount + 1);
//   };

//   const decreaseCartCount = () => {
//     if (cartCount > 0) {
//       setCartCount((prevCount) => prevCount - 1);
//     }
//   };

//   const addToCart = (item) => {
//     addToCart(product);
//     setCartItems((prevItems) => [...prevItems, item]);
//     increaseCartCount();
//   };

//   const removeFromCart = (itemId) => {
//     setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
//     decreaseCartCount();
//   };

//   const clearCart = () => {
//     setCartItems([]);
//     setCartCount(0);
//   };

//   const handleQuantityChange = (item, quantity) => {
//     setCartItems((prevItems) =>
//       prevItems.map((cartItem) =>
//         cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
//       )
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         cartCount,
//         increaseCartCount,
//         decreaseCartCount,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         handleQuantityChange,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
