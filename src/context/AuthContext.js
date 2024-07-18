// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { googleLogout } from "@react-oauth/google"; // Import googleLogout function

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [bannerData, setBannerData] = useState([]);
//   const [dataLoading, setDataLoading] = useState(true);
//   const [dataError, setDataError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = localStorage.getItem("token"); // Adjust the token retrieval as necessary
//       if (!token) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await axios.get(
//           "http://localhost:8081/auth/check-auth",
//           {
//             headers: {
//               Authorization: `Bearer${token}`,
//             },
//           }
//         );
//         const { token, id, name, email: userEmail, college } = response.data;
//         setUser(id, name, email, college);
//         if (response.data.authenticated) {
//           setUser(response.data.user);
//           console.log(response.data.user);
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Not authenticated", error);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8081/api/bannerAds");
//         setBannerData(response.data);
//         setDataLoading(false);
//       } catch (error) {
//         setDataError(error);
//         setDataLoading(false);
//       }
//     };

//     checkAuth();
//     fetchData();
//   }, []);

//   const login = async (email, password) => {
//     try {
//       const response = await axios.post("http://localhost:8081/auth/login", {
//         email,
//         password,
//       });

//       const { token, id, name, email: userEmail, college } = response.data;
//       localStorage.setItem("authToken", token); // Store token in localStorage
//       setUser({ id, name, email: userEmail, college });
//       navigate("/");
//     } catch (error) {
//       throw new Error(error.response?.data?.message || "Login failed");
//     }
//   };

//   const signup = async (userData) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:8081/auth/signup",
//         userData,
//         { withCredentials: true }
//       );
//       setUser(response.data.user);
//       localStorage.setItem("authToken", response.data.token); // Store token in localStorage
//       navigate("/login");
//     } catch (error) {
//       throw new Error(error.response?.data?.message || "Signup failed");
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("authToken"); // Ensure the key name matches what you use to store the token
//     googleLogout(); // Call googleLogout to sign out from Google
//     navigate("/login");
//   };

//   const updateUser = (updatedUser) => {
//     setUser(updatedUser);
//   };

//   const googlelogin = async (response) => {
//     const token = response.credential;
//     try {
//       const res = await axios.post("http://localhost:8081/auth/google-login", {
//         idToken: token,
//       });

//       const data = res.data;
//       console.log(data.user);
//       // const id = data.id;
//       setUser(data.user);
//       localStorage.setItem("token", data.token);
//       // const { id, name, email: userEmail, college } = res.data;
//       // localStorage.setItem("authToken", data.token); // Store token in localStorage
//       // setUser({ id, name, email: userEmail, college });
//       navigate("/");
//     } catch (error) {
//       console.error("Google Login failed", error);
//       throw new Error("Google Login failed");
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         signup,
//         logout,
//         updateUser,
//         bannerData,
//         dataLoading,
//         dataError,
//         loading,
//         googlelogin,
//       }}
//     >
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google"; // Import googleLogout function

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bannerData, setBannerData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token"); // Adjust the token retrieval as necessary
      if (!token) {
        setLoading(false);
        return;
      }
      console.log(process.env.REACT_APP_BACKEND_URL, "env file ");
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/auth/check-auth`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { id, name, email, college, photoUrl } = response.data.user;
        setUser({ id, name, email, college, photoUrl });
      } catch (error) {
        console.error("Not authenticated", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/bannerAds`
        );
        setBannerData(response.data);
        setDataLoading(false);
      } catch (error) {
        setDataError(error);
        setDataLoading(false);
      }
    };

    checkAuth();
    fetchData();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const { id, name, email: userEmail, college, photoUrl } = response.data;
      localStorage.setItem("token", response.data.token); // Store token in localStorage
      setUser({ id, name, email: userEmail, college, photoUrl });
      navigate("/");
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
        userData,
        { withCredentials: true }
      );
      const {
        id,
        name,
        email: userEmail,
        college,
        photoUrl,
      } = response.data.user;
      setUser({ id, name, email: userEmail, college, photoUrl });
      localStorage.setItem("token", response.data.token); // Store token in localStorage
      navigate("/login");
    } catch (error) {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Ensure the key name matches what you use to store the token
    googleLogout(); // Call googleLogout to sign out from Google
    navigate("/login");
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const googlelogin = async (response) => {
    const token = response.credential;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/google-login`,
        {
          idToken: token,
        }
      );

      const { id, name, email, college, photoUrl } = res.data.user;
      setUser({ id, name, email, college, photoUrl });
      localStorage.setItem("token", res.data.token); // Store token in localStorage
      navigate("/");
    } catch (error) {
      console.error("Google Login failed", error);
      throw new Error("Google Login failed");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        updateUser,
        bannerData,
        dataLoading,
        dataError,
        loading,
        googlelogin,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
