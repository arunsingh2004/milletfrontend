import React, { useContext } from "react";
import ProductManagement from "./ProductManagement";
import AboutPageManagement from "./AboutManagement";
import { AuthContext } from "../../context/AuthContext";
export const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const ADMIN_EMAIL = [
    "aruns.ug21.cs@nitp.ac.in",
    "satyameviasacademy@gmail.com",
    "themilletodyssey@gmail.com",
    "arunsinghbrh9006@gmail.com",
  ];
  const isAdmin = user && ADMIN_EMAIL.includes(user.email);
  if (!isAdmin) {
    return <p>Access Denied</p>;
  }
  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <div>
          <ProductManagement />
        </div>
        <div>
          <AboutPageManagement />
        </div>
      </div>
    </>
  );
};
