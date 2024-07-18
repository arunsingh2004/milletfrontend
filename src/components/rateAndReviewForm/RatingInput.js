import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

const RatingInput = ({ productId, onUpdateRating }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleRateProduct = () => {
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/${productId}/rate?rating=${rating}`,
      {
        method: "PUT",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        onUpdateRating(data);
        setRating(0);
      })
      .catch((error) => console.error("Error rating product:", error));
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <Rating name="user-rating" value={rating} onChange={handleRatingChange} />
      <Button
        variant="contained"
        className="RatingButton"
        style={{ backgroundColor: "#CF7D08", fontWeight: "bold" }}
        onClick={handleRateProduct}
      >
        Rate Product
      </Button>
    </div>
  );
};

export default RatingInput;
