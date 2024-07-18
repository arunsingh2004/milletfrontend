import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { ReactComponent as CartIcon } from "../../assets/icons/cartIcon.svg";
import { ReactComponent as AccountIcon } from "../../assets/icons/Account.svg";
import { ReactComponent as ComparingIcon } from "../../assets/icons/Comparing.svg";
import { ReactComponent as HeartIcon } from "../../assets/icons/Heart.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/Search.svg";
import { ReactComponent as CollapsableDrawer } from "../../assets/icons/LineWidth.svg";
import { ReactComponent as BrowseAll } from "../../assets/icons/BrowseAll.svg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AnchorTemporaryDrawer from "../header/AnchorTemporaryDrawer";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/cartContext";
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

const Headers = ({ onCartClick, cartItems }) => {
  const { user, logout, loading } = useContext(AuthContext);
  const [showNav, setshowNav] = useState(window.screen.width >= 1260);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();
  console.log(user);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login");
  // };
  const ADMIN_EMAIL = [
    "aruns.ug21.cs@nitp.ac.in",
    "satyameviasacademy@gmail.com",
    "themilletodyssey@gmail.com",
    "arunsinghbrh9006@gmail.com",
  ];
  const isAdmin = user && ADMIN_EMAIL.includes(user.email);
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
    <div className="MainHeader">
      <Navbar expand="lg" className="nav-bar-custom">
        <Link to="/" className="navbar-brand p-2">
          <img src={Logo} alt="Logo" height="100px" width="100px" />
        </Link>
        <Navbar.Toggle
          className="m-3"
          aria-controls="navbarScroll"
          onClick={() => setshowNav(!showNav)}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-3 mt-2">
            {/* <Form className="search-row"> */}
            {/* <Dropdown>
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  All Categories
                </Dropdown.Toggle>
                <Dropdown.Menu className="custom-dropdown-menu dropdown-menu-list">
                  <Dropdown.Item
                    as={Link}
                    to="/cookies"
                    className="custom-dropdown-item"
                  >
                    Cookies
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/bakes"
                    className="custom-dropdown-item"
                  >
                    Bakes
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/crackers"
                    className="custom-dropdown-item"
                  >
                    Crackers
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/flours"
                    className="custom-dropdown-item"
                  >
                    Flours
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
            {/* <div
                style={{
                  width: "1px",
                  height: "38px",
                  backgroundColor: "black",
                  marginLeft: "12px",
                  marginRight: "12px",
                  marginTop: "2px",
                }}
              ></div> */}
            {/* <FormControl
                type="text"
                placeholder="Search for items"
                style={{
                  border: "none",
                  marginLeft: "0.75rem",
                  fontSize: "medium",
                }}
              />{" "} */}
            {/* <div className="search-icon">
                <SearchIcon
                  width={40}
                  height={40}
                  style={{ marginRight: "15px" }}
                />
              </div> */}
            {/* </Form> */}
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link className="px-2 "></Nav.Link>
            {/* <Nav.Link
              as="div"
              className="px-2 d-flex align-items-center nav-content"
            >
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <ComparingIcon width={40} height={40} color="red" />
                <span className="icon-text">Compare</span>
              </div>
            </Nav.Link> */}
            <Nav.Link
              as={Link}
              to="/wishlist"
              className=" px-2 d-flex align-items-center nav-content"
            >
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <HeartIcon width={40} height={40} color="red" />
                <span className="icon-text">Wishlist</span>
              </div>
            </Nav.Link>
            <Nav.Link
              className=" px-2 d-flex align-items-center nav-content"
              onClick={onCartClick}
            >
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <CartIcon width={40} height={40} color="red"></CartIcon>
                <div class="cart-basket d-flex align-items-center justify-content-center cart-count">
                  {cartCount}
                </div>
                <span className="icon-text">Cart</span>
              </div>
            </Nav.Link>
            <Nav.Link className=" px-2 d-flex align-items-center nav-content">
              <Dropdown align="end">
                <Dropdown.Toggle
                  as={CustomToggle}
                  id="dropdown-account"
                  className="d-flex align-items-center"
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AccountIcon width={40} height={40} />
                    <span className="icon-text" style={{ marginTop: "auto" }}>
                      Account
                    </span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="custom-dropdown-menu dropdown-menu-list2">
                  {user ? (
                    <>
                      <Dropdown.Item
                        as={Link}
                        to="/profile"
                        className="custom-dropdown-item"
                      >
                        Profile({user.name})
                      </Dropdown.Item>
                      <Dropdown.Item
                        as="div"
                        onClick={logout}
                        className="custom-dropdown-item"
                      >
                        Logout
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      <Dropdown.Item
                        as={Link}
                        to="/login"
                        className="custom-dropdown-item"
                      >
                        Login/SignUp
                      </Dropdown.Item>
                    </>
                  )}
                  {isAdmin && (
                    <Dropdown.Item
                      as={Link}
                      to="/dashboard"
                      className="custom-dropdown-item"
                    >
                      Admin Dashboard
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item
                    as={Link}
                    to="/orders"
                    className="custom-dropdown-item"
                  >
                    Orders
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Link>

            {window.innerWidth <= 1000 && (
              <Nav.Link className=" px-3 d-flex align-items-center nav-content nav-content-drawer">
                <div
                  style={{ display: "flex", alignItems: "flex-end" }}
                  onClick={() => setDrawerOpen(!drawerOpen)}
                >
                  <span className="icon-text2">
                    {" "}
                    <BrowseAll
                      className="imgbrowse"
                      width={24}
                      height={24}
                      color="red"
                    />{" "}
                    BrowseAll
                  </span>
                </div>
                <AnchorTemporaryDrawer
                  open={drawerOpen}
                  toggleDrawer={toggleDrawer}
                />
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Headers;
