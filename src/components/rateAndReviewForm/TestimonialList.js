import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Review.css";

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/testimonials/`
        );
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <div className="testimonial-list">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="testimonial-card-wrapper">
          <div className="testimonial-card">
            <div className="card-up"></div>
            <div className="avatar mx-auto bg-white">
              <img
                src={testimonial.profilepic}
                className="rounded-circle img-fluid"
                alt="avatar"
              />
            </div>
            <div className="card-body">
              <h4 className="">{testimonial.name}</h4>
              <p className="dark-grey-text">
                <i className="fas fa-quote-left pe-2"></i>
                {testimonial.message}
              </p>
              {/* {testimonial.imageUrl && testimonial.imageUrl.trim() !== "" && (
                <img
                  src={testimonial.imageUrl}
                  alt="Testimonial"
                  className="img-fluid testimonial-image"
                />
              )} */}
              <p>{testimonial.videoUrl}</p>
              {/* {testimonial.videoUrl && testimonial.videoUrl.trim() !== "" && (
                <video controls className="img-fluid testimonial-video">
                  <source src={testimonial.videoUrl} type="video/mp4" />
                </video>
              )} */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestimonialList;
