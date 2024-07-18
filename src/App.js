import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Headers from "./components/newHeader/header";
import ChildNav from "./components/header/ChildNav";
import { MainBanner } from "./components/banner/mainBanner";
import { Featureproducts } from "./components/featureProducts/featureProducts";
import { ShopByDiet } from "./components/shopByDiet/shopByDiet";
import { ShopByconcern } from "./components/shopByconcern/shopByconcern";
import { ShopBycustomization } from "./components/ShopBycustomization/ShopBycustomization";
import Footer from "./components/footer/footer";
import Drawercart from "./components/cart/DrawerCart";
import Shop from "./components/shop/Shop";
import Wishlist from "./components/wishlist/Wishlist";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Profile from "./components/auth/profile";
import { Container } from "react-bootstrap";
import ProductDetail from "./components/productDetails/ProductDetail";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import ListContainer from "./components/Order/ListContainer";
import { OrderDetails } from "./components/Order/orderDetails";
import { RateAndReview } from "./components/rateAndReviewForm/form";
import { CartContextProvider } from "./context/cartContext";
import About from "./components/About";
import Review from "./components/rateAndReviewForm/Review";
import { Dashboard } from "./components/dashboard/Dashboard";
import Contact from "./components/contact/Contact";
function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const handleDrawerToggle = (open) => {
    setIsDrawerOpen(open);
  };

  const handleAddToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };
  const handleAddToWishlist = (product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item.id !== productId));
  };

  const handleQuantityChange = (product, quantity) => {
    if (quantity <= 0) return;
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === product.id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== product.id)
    );
  };
  const clearCart = () => {
    setCartItems([]);
    // setCartCount(0);
  };
  const handleSort = (sortType) => {
    let sorted;
    if (sortType === "lowToHigh") {
      sorted = [...products].sort((a, b) => a.price - b.price);
    } else if (sortType === "highToLow") {
      sorted = [...products].sort((a, b) => b.price - a.price);
    }
    setSortedProducts(sorted);
  };

  return (
    <div className="myapp">
      <div className="ads-section">
        <div>100% Secure delivery without contacting the owner</div>
      </div>
      <Router>
        <AuthProvider>
          <ProductProvider>
            <CartContextProvider>
              <Headers onCartClick={() => handleDrawerToggle(true)} />
              <ChildNav />
              <Container fluid>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <MainBanner />
                        <Featureproducts />
                        <ShopByDiet />
                        <ShopByconcern />
                        <ShopBycustomization />
                      </>
                    }
                  />
                  <Route
                    path="/productDetails/:productId"
                    element={
                      <ProductDetail
                        cartItems={cartItems}
                        handleAddToCart={handleAddToCart}
                        handleAddToWishlist={handleAddToWishlist}
                        handleRemoveFromWishlist={handleRemoveFromWishlist}
                        handleQuantityChange={handleQuantityChange}
                        handleRemoveItem={handleRemoveItem}
                        isDrawerOpen={isDrawerOpen}
                        handleDrawerToggle={handleDrawerToggle}
                        wishlist={wishlist}
                      />
                    }
                  />
                  <Route
                    path="/shop"
                    element={
                      <Shop
                        cartItems={cartItems}
                        handleAddToCart={handleAddToCart}
                        handleAddToWishlist={handleAddToWishlist}
                        handleRemoveFromWishlist={handleRemoveFromWishlist}
                        handleQuantityChange={handleQuantityChange}
                        handleRemoveItem={handleRemoveItem}
                        isDrawerOpen={isDrawerOpen}
                        handleDrawerToggle={handleDrawerToggle}
                        wishlist={wishlist}
                      />
                    }
                  />
                  <Route
                    path="/wishlist"
                    element={
                      <Wishlist
                        wishlist={wishlist}
                        handleAddToCart={handleAddToCart}
                        handleRemoveFromWishlist={handleRemoveFromWishlist}
                      />
                    }
                  />
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/signup" element={<Signup />}></Route>
                  <Route path="/profile" element={<Profile />}></Route>
                  <Route path="/orders" element={<ListContainer />}></Route>
                  <Route path="/aboutus" element={<About />}></Route>
                  <Route path="/review" element={<Review />}></Route>
                  <Route path="/dashboard" element={<Dashboard />}></Route>
                  <Route path="/contact-us" element={<Contact />}></Route>
                  <Route
                    path="/orderDetails/:orderId"
                    element={<OrderDetails />}
                  ></Route>
                  <Route
                    path={"/rateAndReview"}
                    element={<RateAndReview />}
                  ></Route>
                </Routes>
              </Container>
              <Footer />
              <Drawercart
                isDrawerOpen={isDrawerOpen}
                handleDrawerToggle={handleDrawerToggle}
                cartItems={cartItems}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
                clearCart={clearCart}
              />
            </CartContextProvider>
          </ProductProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
