import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, googlelogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  const handleLoginSuccess = async (response) => {
    try {
      await googlelogin(response);
      navigate("/");
    } catch (error) {
      console.error("Google login failed", error);
      setError("Google login failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ backgroundColor: "#f8f1e4" }}>
            <div className="card-body">
              <h2
                className="card-title text-center"
                style={{ color: "#5d4037" }}
              >
                Login
              </h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email" style={{ color: "#5d4037" }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" style={{ color: "#5d4037" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <div>
                  <button
                    type="submit"
                    className="btn btn-block m-3"
                    style={{ backgroundColor: "#5d4037", color: "white" }}
                  >
                    Login
                  </button>
                  <Link to="/signup">
                    <button
                      type="button"
                      className="btn btn-block m-3"
                      style={{ backgroundColor: "#5d4037", color: "white" }}
                    >
                      Signup
                    </button>
                  </Link>
  
                  <GoogleOAuthProvider clientId="910336459454-a1dkjm9joas6dpq7mhdem7kf5ldb2nkd.apps.googleusercontent.com">
                    <div className="login-page">
                      <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onError={(error) => setError("Google login failed")}
                      />
                    </div>
                  </GoogleOAuthProvider>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
