import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser, loading } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    college: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    // Fetch profile data when component mounts
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth/check-auth`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile data");
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
      [college]: value,
      [email]: value,
      [phone]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/student/${user.id}`,
        profile,
        {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Profile updated successfully:", response.data);
      setSuccess("Profile updated successfully");
      setError("");
      setProfile(response.data);
      updateUser(response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile data");
      setSuccess("");
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className={`needs-validation ${error ? "was-validated" : ""}`}
      noValidate
    >
      <div className="card border-primary">
        <h6 className="card-header">
          <i className="bi bi-person-lines-fill" /> Profile Detail
        </h6>
        <div className="card-body">
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <div className="form-group">
              <label htmlFor="name" style={{ color: "#5d4037" }}>
                Name
              </label>
              <input
                type="text"
                placeholder={user.name}
                className="form-control"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                required
              />
            </div>
          </li>
          <li className="list-group-item">
            <div className="form-group">
              <label htmlFor="phone" style={{ color: "#5d4037" }}>
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </li>
          <li className="list-group-item">
            <div className="form-group">
              <label htmlFor="email" style={{ color: "#5d4037" }}>
                Email address
              </label>
              <input
                type="email"
                placeholder={user.email}
                className="form-control"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </li>
          <li className="list-group-item">
            <div className="form-group">
              <label htmlFor="address" style={{ color: "#5d4037" }}>
                Address
              </label>
              <input
                type="text"
                placeholder={user.college}
                className="form-control"
                id="college"
                name="college"
                value={profile.college}
                onChange={handleInputChange}
                required
              />
            </div>
          </li>
        </ul>
        <div className="card-body">
          {error && <div style={{ color: "red" }}>{error}</div>}
          {success && <div style={{ color: "green" }}>{success}</div>}
          <button
            type="submit"
            className="btn btn-primary d-flex"
            disabled={
              !profile.name ||
              !profile.email ||
              !profile.college ||
              !profile.phone
            }
          >
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Profile;
