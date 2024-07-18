import React, { useEffect, useState } from "react";
import "./Shop.css";
import Header from "../newHeader/header";
import Footer from "../footer/footer";
import Drawercart from "../cart/DrawerCart";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, styled, createTheme, ThemeProvider } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useCart } from "../../context/cartContext";

//3d effect
const customTheme = createTheme({
  palette: {
    primary: {
      main: "#CF7D08",
    },
    secondary: {
      main: "#CF7D08",
    },
  },
});

const StyledButton = styled(Button)`
  ${({ theme }) => `
    && {
      cursor: pointer;
      background-color: ${theme.palette.primary.main};
      color: ${theme.palette.getContrastText(theme.palette.primary.main)};
      transition: ${theme.transitions.create(
        ["background-color", "transform"],
        {
          duration: theme.transitions.duration.standard,
        }
      )};
      &:hover {
        background-color: ${theme.palette.secondary.main};
        transform: scale(1.1);
      }
    }
       @media (max-width: 600px) {
      && {
        padding: 5px 11px;  
        font-size: 11px; 
      }
    }
  `}
`;

const Shop = ({
  cartItems,
  handleAddToCart,
  handleAddToWishlist,
  handleQuantityChange,
  handleRemoveItem,
  isDrawerOpen,
  handleDrawerToggle,
  wishlist,
  handleRemoveFromWishlist,
}) => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(""); // 'asc' for ascending, 'desc' for descending
  const { cartCount, increaseCartCount } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/product/`
        );
        const data = await response.json();
        setProducts(data);
        setSortedProducts(data); // Initially set to fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  }, [showMessage]);

  useEffect(() => {
    if (products.length > 0) {
      let sortedArray = [...products];
      if (sortOrder === "asc") {
        sortedArray.sort((a, b) => a.price - b.price);
      } else if (sortOrder === "desc") {
        sortedArray.sort((a, b) => b.price - a.price);
      }
      setSortedProducts(sortedArray);
    }
  }, [sortOrder, products]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      handleRemoveFromWishlist(product.id);
    } else {
      handleAddToWishlist(product);
    }
  };

  const menuItem = [
    { label: "High to Low", value: "desc" },
    { label: "Low to High", value: "asc" },
  ];

  const handleAddToCarts = (product) => {
    handleAddToCart(product);
    setSelected([...selected, product]);
    increaseCartCount();
  };

  return (
    <div className="shop-page">
      <div className="shop-content">
        <div className="sorter">
          <h1>Our Products</h1>
          <div className="sort-filter">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                id="sort"
                onChange={handleSortChange}
                value={sortOrder}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className="sort-button"
              >
                <MenuItem disabled value="">
                  <em>Sort</em>
                </MenuItem>
                {menuItem.map(({ label, value }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="product-list">
          {sortedProducts.map((product) => (
            <div key={product.id} className="product-item">
              <Link to={`/productDetails/${product.id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                  height={"500px"}
                  width={"300px"}
                />
                <h2 style={{ color: "black" }}>{product.name}</h2>
                <div style={{ color: "black" }}>₹ {product.price}</div>
              </Link>
              <div style={{ color: "black" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 10,
                  }}
                >
                  <span style={{ marginRight: 8 }}>
                    {product.reviews.reduce(
                      (acc, review) => acc + review.rating,
                      0
                    ) / product.reviews.length || 0}
                  </span>
                  <Rating
                    name="read-only"
                    value={
                      product.reviews.reduce(
                        (acc, review) => acc + review.rating,
                        0
                      ) / product.reviews.length || 5
                    }
                    readOnly
                  />
                  <span style={{ marginLeft: 8 }}>
                    {product.reviews.length} (reviews)
                  </span>
                </div>
                <div className="product-actions">
                  <ThemeProvider theme={customTheme}>
                    <StyledButton
                      variant="contained"
                      onClick={() => handleAddToCarts(product)}
                    >
                      Add to Cart
                    </StyledButton>
                  </ThemeProvider>
                  <span
                    className="wishlist-icon"
                    onClick={() => toggleWishlist(product)}
                  >
                    {wishlist.some((item) => item.id === product.id) ? (
                      <FaHeart color="#CF7D08" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Drawercart
        isDrawerOpen={isDrawerOpen}
        handleDrawerToggle={handleDrawerToggle}
        cartItems={cartItems}
        handleQuantityChange={handleQuantityChange}
        handleRemoveItem={handleRemoveItem}
      />
    </div>
  );
};

export default Shop;
