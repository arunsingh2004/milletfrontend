// import React, { useState, useEffect } from "react";
// import "./header.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Dropdown, DropdownButton } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import Logo from "../../assets/images/logo.png";
// import { ReactComponent as CartIcon } from "../../assets/icons/cartIcon.svg";
// import { ReactComponent as AccountIcon } from "../../assets/icons/Account.svg";
// import { ReactComponent as ComparingIcon } from "../../assets/icons/Comparing.svg";
// import { ReactComponent as HeartIcon } from "../../assets/icons/Heart.svg";
// import { ReactComponent as SearchIcon } from "../../assets/icons/Search.svg";
// import { ReactComponent as CollapsableDrawer } from "../../assets/icons/LineWidth.svg";
// import MobileHeader from "./MobileHeader";

// const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
//   <div
//     ref={ref}
//     onClick={(e) => {
//       e.preventDefault();
//       onClick(e);
//     }}
//     style={{ cursor: "pointer" }}
//   >
//     {children}
//   </div>
// ));

// const Header = ({ onCartClick }) => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [showNav, setShowNav] = useState(window.innerWidth >= 1260);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       setShowNav(window.innerWidth >= 1260);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   if (isMobile) {
//     return <MobileHeader />;
//   }

//   return (
//     <div>
//       <div className="header-container">
//         <div className="header-row">
//           <div className="logo-row">
//             <Link to="/">
//               <img src={Logo} alt="Logo" height={"100px"} width={"100px"} />
//             </Link>
//           </div>
//           <div className="search-row">
//             <DropdownButton
//               variant=""
//               id="dropdown-basic-button"
//               title="All Categories"
//             >
//               <Dropdown.Item
//                 as={Link}
//                 to="/cookies"
//                 className="custom-dropdown-item"
//               >
//                 Cookies
//               </Dropdown.Item>
//               <Dropdown.Item
//                 as={Link}
//                 to="/bakes"
//                 className="custom-dropdown-item"
//               >
//                 Bakes
//               </Dropdown.Item>
//               <Dropdown.Item
//                 as={Link}
//                 to="/crackers"
//                 className="custom-dropdown-item"
//               >
//                 Crackers
//               </Dropdown.Item>
//               <Dropdown.Item
//                 as={Link}
//                 to="/flours"
//                 className="custom-dropdown-item"
//               >
//                 Flours
//               </Dropdown.Item>
//             </DropdownButton>
//             <div
//               style={{
//                 width: "1px",
//                 height: "40px",
//                 backgroundColor: "black",
//                 marginLeft: "12px",
//                 marginRight: "12px",
//                 marginTop: "2px",
//               }}
//             ></div>
//             <input
//               placeholder="Search for items"
//               type="text"
//               style={{
//                 border: "none",
//                 marginLeft: "0.75rem",
//                 fontSize: "medium",
//               }}
//             />
//             <div className="search-icon">
//               <SearchIcon
//                 width={40}
//                 height={40}
//                 style={{ marginRight: "15px" }}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="header-row-last">
//           <div className="header-list">
//             <div className="icons-header">
//               <ComparingIcon width={40} height={40} color="red" />
//               <div className="icon-text">Compare</div>
//             </div>
//             <div className="icons-header">
//               <Link to="/wishlist" className="header-link">
//                 <HeartIcon width={40} height={40} color="red" />
//                 <div className="icon-text">Wishlist</div>
//               </Link>
//             </div>
//             <div className="icons-header" onClick={onCartClick}>
//               <CartIcon width={40} height={40} color="red" />
//               <div className="icon-text">Cart</div>
//             </div>
//             <div className="icons-header">
//               <Dropdown>
//                 <Dropdown.Toggle as={CustomToggle} id="dropdown-account">
//                   <AccountIcon width={40} height={40} />
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu align="end" className="custom-dropdown-menu">
//                   <Dropdown.Item
//                     as={Link}
//                     to="/profile"
//                     className="custom-dropdown-item"
//                   >
//                     Profile
//                   </Dropdown.Item>
//                   <Dropdown.Item
//                     as={Link}
//                     to="/settings"
//                     className="custom-dropdown-item"
//                   >
//                     Settings
//                   </Dropdown.Item>
//                   <Dropdown.Item
//                     as={Link}
//                     to="/orders"
//                     className="custom-dropdown-item"
//                   >
//                     Orders
//                   </Dropdown.Item>
//                   <Dropdown.Item
//                     as={Link}
//                     to="/logout"
//                     className="custom-dropdown-item"
//                   >
//                     Logout
//                   </Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//               <div className="icon-text">Account</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default Header;
