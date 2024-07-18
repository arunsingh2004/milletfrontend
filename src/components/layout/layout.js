import React from "react";
import { Navbar } from "react-bootstrap";
import Footer from "../footer/footer";
import Header from "../header/header";
// Pass the child props
export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {/* display the child prop */}
      {children}
      <Footer />
    </div>
  );
}
