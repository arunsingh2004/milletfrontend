import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // 'asc' for ascending, 'desc' for descending

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/product/`
        );
        setProducts(response.data); // Set products in state
        setSortedProducts(response.data); // Initially set to fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let sortedArray = [...products];
    if (sortOrder === "asc") {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      sortedArray.sort((a, b) => b.price - a.price);
    }
    setSortedProducts(sortedArray);
  }, [sortOrder, products]);

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const getProductsByType = (type) => {
    return products.filter((product) => product.type === type);
  };
  console.log(products);
  return (
    <ProductContext.Provider
      value={{
        products,
        sortedProducts,
        handleSortChange,
        setProducts,
        getProductsByType,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => useContext(ProductContext);
