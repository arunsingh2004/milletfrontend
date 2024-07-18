import React, { useState, useContext } from "react";
import "./childnav.css";
import { Link } from "react-router-dom";
import { ReactComponent as BrowseAll } from "../../assets/icons/BrowseAll.svg";
import { ReactComponent as Home } from "../../assets/icons/Home.svg";
import { ReactComponent as Shop } from "../../assets/icons/Shop.svg";
import { ReactComponent as AboutUs } from "../../assets/icons/AbotUs.svg";
import { ReactComponent as ContactUs } from "../../assets/icons/ContactUs.svg";
import { ReactComponent as Reviews } from "../../assets/icons/Reviews.svg";
import { AuthContext } from "../../context/AuthContext";
import AnchorTemporaryDrawer from "./AnchorTemporaryDrawer";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ cursor: "pointer" }}
  >
    {children}
  </div>
));

const ChildNav = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useContext(AuthContext);
  // const ADMIN_EMAIL = "aruns.ug21.cs@nitp.ac.in";

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div className="childnav-container">
      <div className="childnav-content">
        {window.innerWidth > 1000 && (
          <>
            <div className="browse-button" onClick={toggleDrawer(true)}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <BrowseAll
                  className="imgbrowse"
                  width={24}
                  height={24}
                  color="red"
                />
                Browse All Categories
              </div>
            </div>
            <AnchorTemporaryDrawer
              open={drawerOpen}
              toggleDrawer={toggleDrawer}
            />
          </>
        )}
        {/* <div>
        <Home width={40} height={40} color="red" />
        <Link to="/" className="nav-item">Home</Link>
        </div> */}
        <Link to="/" className="icontext">
          <div>
            <Home width={40} height={40} color="red" />
            <span className="nav-item">Home</span>
          </div>
        </Link>
        {/* <div>
        <Shop width={40} height={40} color="red" />
        <Link to="/shop" className="nav-item">Shop</Link>
        </div> */}
        <Link to="/shop" className="icontext">
          <div>
            <Shop width={40} height={40} color="red" />
            <span className="nav-item">Shop</span>
          </div>
        </Link>
        {/* <div>
        <AboutUs width={40} height={40} color="red" />
        <Link to="/about-us" className="nav-item">About</Link>
        </div> */}
        <Link to="/aboutus" className="icontext">
          <div>
            <AboutUs width={40} height={40} color="red" />
            <span className="nav-item">About</span>
          </div>
        </Link>
        {/* <div>
        <Reviews width={40} height={40} color="red" />
        <Link to="/reviews" className="nav-item">Reviews</Link>
        </div> */}
        <Link to="/review" className="icontext">
          <div>
            <Reviews width={40} height={40} color="red" />
            <span className="nav-item">Reviews</span>
          </div>
        </Link>
        {/* <div>
        <ContactUs width={40} height={40} color="red" />
        <Link to="/contact-us" className="nav-item">Contact</Link>
        </div> */}
        <Link to="/contact-us" className="icontext">
          <div>
            <ContactUs width={40} height={40} color="red" />
            <span className="nav-item">Contact</span>
          </div>
        </Link>
        {/* {user && user.email === ADMIN_EMAIL && (
          <Link to="/dashboard" className="icontext">
            <div>
              <ContactUs width={40} height={40} color="red" />
              <span className="nav-item">Dashboard for Admin</span>
            </div>
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default ChildNav;
