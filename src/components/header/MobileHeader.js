import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { ReactComponent as MenuIcon } from "../../assets/icons/icons8-menu.svg";
import { Button } from "react-bootstrap";

const MobileHeader = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="header-container">
      <Button className="menu-button" onClick={toggleSidebar}>
        <MenuIcon width={20} height={20} />
      </Button>
      {sidebarVisible && (
        <div className="sidebar">
          <Button className="close-button" onClick={toggleSidebar}>
            X
          </Button>
          <div className="sidebar-content">
            <div className="sidebar-categories">
              <h3>Categories</h3>
              <Link to="/shop-by-diet">Shop by Diet</Link>
              <Link to="/shop-by-concern">Shop by Concern</Link>
              <Link to="/shop-by-customization">Shop by Customization</Link>
            </div>
            <div className="sidebar-menu">
              <h3>Menu</h3>
              <Link to="/cookies">Cookies</Link>
              <Link to="/bakes">Bakes</Link>
              <Link to="/crackers">Crackers</Link>
            </div>
            <div className="sidebar-account">
              <h3>Account</h3>
              <Link to="/profile">Profile</Link>
              <Link to="/orders">Orders</Link>
              <Link to="/cart">Cart</Link>
              <Link to="/wishlist">Wishlist</Link>
              <Link to="/logout">Log Out</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
