import React, { useState } from "react";
import axios from "axios";
import "./Review.css"; // Import the CSS file
import { ReviewSuccess } from "./reviewSuccess";

const TestimonialForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [profilepic, setProfilepic] = useState(null);
  const [image, setImage] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profilepic) {
      alert("Profile picture is required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);
    formData.append("profilepic", profilepic);
    if (image) {
      formData.append("image", image);
    }
    if (videoUrl) {
      formData.append("videoUrl", videoUrl);
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/testimonials/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Testimonial submitted successfully");
      setName("");
      setMessage("");
      setProfilepic(null);
      setImage(null);
      setVideoUrl("");
    } catch (error) {
      console.error("There was an error submitting the testimonial!", error);
    }
  };

  return (
    <>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="testimonial-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Profile Picture:</label>
            <input
              type="file"
              onChange={(e) => setProfilepic(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="form-group">
            <label>Video URL:</label>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            Submit Testimonial
          </button>
        </form>
      ) : (
        <ReviewSuccess />
      )}
    </>
  );
};

export default TestimonialForm;
