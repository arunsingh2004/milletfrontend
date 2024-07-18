import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Review.css";
import { AuthContext } from "../../context/AuthContext";
import TestimonialList from "./TestimonialList";
import TestimonialForm from "./TestimonialForm";
import { ReviewSuccess } from "./reviewSuccess";
const Review = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="reviews-section">
        <h1>Your Messages</h1>
        <section>
          <TestimonialList />
          {/* <div className="testimonial-card-wrapper"> */}
          {/* </div> */}
        </section>
        {user && <TestimonialForm />}
      </div>
    </>
  );
};

export default Review;
