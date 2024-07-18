// import React, { useEffect, useState } from "react";
// import ProductImages from "./ProductImages";
// import QuantitySelector from "./QuantitySelector";
// import "./ProductDetail.css";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { Button, styled, createTheme, ThemeProvider } from "@mui/material";
// import Rating from "@mui/material/Rating";
// import { useCart } from "../context/cartContext";
// import { Container } from "@mui/material";
// import { useParams } from "react-router-dom";

// const customTheme = createTheme({
//   palette: {
//     primary: {
//       main: "#CF7D08",
//     },
//     secondary: {
//       main: "#CF7D08",
//     },
//   },
// });

// const StyledButton = styled(Button)`
//   ${({ theme }) => `
//     && {
//       cursor: pointer;
//       background-color: ${theme.palette.primary.main};
//       color: ${theme.palette.getContrastText(theme.palette.primary.main)};
//       transition: ${theme.transitions.create(
//         ["background-color", "transform"],
//         {
//           duration: theme.transitions.duration.standard,
//         }
//       )};
//       &:hover {
//         background-color: ${theme.palette.secondary.main};
//         transform: scale(1.1);
//       }
//     }
//        @media (max-width: 600px) {
//       && {
//         padding: 5px 11px;
//         font-size: 11px;
//       }
//     }
//   `}
// `;

// const DescriptionBox = styled("div")`
//   border: 1px solid #cf7d08;
//   border-radius: 8px;
//   padding: 16px;
//   margin-top: 20px;
//   margin-bottom: 20px;
//   background-color: #fff7e6;
// `;

// const ProductDetail = ({
//   cartItems,
//   handleAddToCart,
//   handleAddToWishlist,
//   handleQuantityChange,
//   handleRemoveItem,
//   isDrawerOpen,
//   handleDrawerToggle,
//   wishlist,
//   handleRemoveFromWishlist,
// }) => {
//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [wishlists, setWishlists] = useState(false);
//   const { increaseCartCount } = useCart();
//   const { productId } = useParams();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8081/product/${productId}`
//         );
//         const data = await response.json();
//         setProduct(data);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchProduct();
//   }, [productId]);

//   const handleAddToCarts = (product) => {
//     const prod = {
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       imageUrl: product.imageUrl,
//       quantity: quantity,
//     };
//     handleAddToCart(prod);

//     increaseCartCount();
//   };

//   const toggleWishlist = (product) => {
//     if (wishlist.some((item) => item.id === product.id)) {
//       handleRemoveFromWishlist(product.id);
//     } else {
//       handleAddToWishlist(product);
//     }
//     setWishlists(!wishlists);
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <Container>
//       <div className="product-detail">
//         <div className="product-images">
//           <ProductImages images={product.additionalImages} />
//         </div>
//         <div className="product-info">
//           <h1>{product.name}</h1>
//           <div className="reviews">
//             <Rating
//               name="read-only"
//               value={
//                 product.reviews.reduce(
//                   (acc, review) => acc + review.rating,
//                   0
//                 ) / product.reviews.length || 5
//               }
//               readOnly
//             />
//             <span className="rating-value">
//               {product.reviews.reduce((acc, review) => acc + review.rating, 0) /
//                 product.reviews.length || 0}
//             </span>
//             <span className="reviewers-info">
//               ({product.reviews.length}{" "}
//               {product.reviews.length === 1 ? "review" : "reviews"})
//             </span>
//           </div>
//           <div className="price">Price: ₹{product.price}</div>
//           <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
//           <div className="action-buttons">
//             <ThemeProvider theme={customTheme}>
//               <StyledButton
//                 variant="contained"
//                 onClick={() => handleAddToCarts(product)}
//                 style={{ padding: "10px", marginTop: "10px" }}
//               >
//                 Add to Cart
//               </StyledButton>
//             </ThemeProvider>
//             <span
//               className="wishlist-icon"
//               onClick={() => toggleWishlist(product)}
//             >
//               {wishlist.some((item) => item.id === product.id) ? (
//                 <FaHeart color="#CF7D08" />
//               ) : (
//                 <FaRegHeart />
//               )}
//             </span>
//           </div>
//         </div>
//       </div>
//       <DescriptionBox>
//         <h3>Description:</h3>
//         <p style={{ color: "black" }}>{product.description}</p>
//       </DescriptionBox>
//     </Container>
//   );
// };

// export default ProductDetail;
// ProductDetail.js
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Rating, Typography } from "@mui/material";
// import axios from "axios";
// // import RateAndReview from "./rateAndReviewForm/form/RateAndReview";
// import { RateAndReview } from "./rateAndReviewForm/form";

// const ProductDetail = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8081/product/${productId}`
//         );
//         setProduct(response.data);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     const fetchReviews = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8081/product/${productId}/reviews`
//         );
//         setReviews(response.data);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };

//     fetchProduct();
//     fetchReviews();
//   }, [productId]);

//   const handleReviewSubmitted = () => {
//     fetchReviews();
//   };

//   if (!product) return <div>Loading...</div>;

//   return (
//     <Container>
//       <Typography variant="h4">{product.name}</Typography>
//       <Typography variant="body1">{product.description}</Typography>
//       <Typography variant="h6">Price: ${product.price}</Typography>
//       <Rating value={product.rating} readOnly />

//       <Typography variant="h5" style={{ marginTop: "20px" }}>
//         Customer Reviews
//       </Typography>
//       {reviews.length > 0 ? (
//         reviews.map((review) => (
//           <div key={review.id}>
//             <Typography variant="h6">{review.title}</Typography>
//             <Rating value={review.rating} readOnly />
//             <Typography variant="body1">{review.comment}</Typography>
//             {review.images &&
//               review.images.map((image, index) => (
//                 <img
//                   key={index}
//                   src={image}
//                   alt="Review"
//                   style={{ width: "100px", margin: "10px" }}
//                 />
//               ))}
//             {review.videos &&
//               review.videos.map((video, index) => (
//                 <video
//                   key={index}
//                   controls
//                   style={{ width: "100px", margin: "10px" }}
//                 >
//                   <source src={video} type="video/mp4" />
//                 </video>
//               ))}
//           </div>
//         ))
//       ) : (
//         <Typography variant="body1">
//           No reviews yet. Be the first to review!
//         </Typography>
//       )}

//       <Typography variant="h5" style={{ marginTop: "20px" }}>
//         Add Your Review
//       </Typography>
//       <RateAndReview onReviewSubmitted={handleReviewSubmitted} />
//     </Container>
//   );
// };

// export default ProductDetail;
// ProductDetail.js
import React, { useEffect, useState } from "react";
import { Container, Rating, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductImages from "./ProductImages";
import QuantitySelector from "../cart/QuantitySelector";
import "./ProductDetail.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Button, styled, createTheme, ThemeProvider } from "@mui/material";
import { useCart } from "../../context/cartContext";
import { RateAndReview } from "../rateAndReviewForm/form";

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

const DescriptionBox = styled("div")`
  border: 1px solid #cf7d08;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fff7e6;
`;

const ProductDetail = ({
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
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [wishlists, setWishlists] = useState(false);
  const { increaseCartCount } = useCart();
  const { productId } = useParams();
  const [reviews, setReviews] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/product/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/product/${productId}/reviews`
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [productId]);

  const handleReviewSubmitted = () => {
    fetchReviews();
  };

  const handleAddToCarts = (product) => {
    const prod = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: quantity,
    };
    handleAddToCart(prod);

    increaseCartCount();
  };

  const toggleWishlist = (product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      handleRemoveFromWishlist(product.id);
    } else {
      handleAddToWishlist(product);
    }
    setWishlists(!wishlists);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <Container>
      <div className="product-detail">
        <div className="product-images">
          <ProductImages images={product.additionalImages} />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <div className="reviews">
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
            <span className="rating-value">
              {product.reviews.reduce((acc, review) => acc + review.rating, 0) /
                product.reviews.length || 0}
            </span>
            <span className="reviewers-info">
              ({product.reviews.length}{" "}
              {product.reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
          <div className="price">Price: ₹{product.price}</div>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          <div className="action-buttons">
            <ThemeProvider theme={customTheme}>
              <StyledButton
                variant="contained"
                onClick={() => handleAddToCarts(product)}
                style={{ padding: "10px", marginTop: "10px" }}
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
      <DescriptionBox>
        <h3>Description:</h3>
        <p style={{ color: "black" }}>{product.description}</p>
      </DescriptionBox>

      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Customer Reviews
      </Typography>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <ul type="square">
              <li>
                <Typography variant="h6" className="comment">
                  {review.userId}
                </Typography>
                <Typography variant="body1" className="comment">
                  {review.comment}
                </Typography>
                <Rating value={review.rating} readOnly />
              </li>
            </ul>
            {/* {review.images &&
              review.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt="Review"
                  style={{ width: "100px", margin: "10px" }}
                />
              ))} */}
            {/* {review.videos &&
              review.videos.map((video, index) => (
                <video
                  key={index}
                  controls
                  style={{ width: "100px", margin: "10px" }}
                >
                  <source src={video} type="video/mp4" />
                </video>
              ))} */}
          </div>
        ))
      ) : (
        <Typography variant="body1">
          No reviews yet. Be the first to review!
        </Typography>
      )}

      <RateAndReview onReviewSubmitted={handleReviewSubmitted} />
    </Container>
  );
};

export default ProductDetail;
