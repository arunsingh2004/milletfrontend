import React, { useState, useContext } from "react";
import { Button, TextField, Rating, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ReviewSuccess } from "./reviewSuccess";
import { AuthContext } from "../../context/AuthContext";

export const RateAndReview = ({ onReviewSubmitted }) => {
  const { user } = useContext(AuthContext);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const { productId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const reviewData = {
      productId: productId,
      userId: user.email,
      comment: comment,
      rating: rating,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/product/${productId}/review`,
        reviewData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Review submitted successfully");
        onReviewSubmitted();
        setComment("");
        setRating(0);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!user) {
    return (
      <div>
        <p>Please log in to submit a review.</p>
        {/* You can add a login button or link here */}
      </div>
    );
  }

  return (
    <div className="form-container">
      <Typography variant="h5" style={{ marginTop: "20px" }}>
        Add Your Review
      </Typography>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            rows={4}
            fullWidth
            required
          />
          <Rating
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit Review
          </Button>
        </form>
      ) : (
        <ReviewSuccess />
      )}
    </div>
  );
};
