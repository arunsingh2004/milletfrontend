import React, { useState, useContext, useEffect } from "react";
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import WishlistIcon from "@mui/icons-material/FavoriteBorder";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { ArrowForward as ArrowForwardIcon } from "@mui/icons-material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Drawercart = ({
  isDrawerOpen,
  handleDrawerToggle,
  cartItems,
  handleQuantityChange,
  handleRemoveItem,
  clearCart,
}) => {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const { increaseCartCount, decreaseCartCount, setCartCount } = useCart();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      const { college, phone } = user;
      setAddress((prev) => ({ ...prev, city: college, phone }));
    }
  }, [user]);

  useEffect(() => {
    const total = calculateTotal();
    const shipping = total > 500 ? 0 : 50;
    const newTotal = total - discount + shipping;
    setTotalAmount(newTotal);
  }, [discount, cartItems]);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/coupons/${coupon}`
      );
      console.log(response, "coupen data");
      const couponData = response.data;
      const total = calculateTotal();

      if (couponData.isPercentage) {
        setDiscount((total * couponData.discount) / 100);
      } else {
        setDiscount(couponData.discount);
      }
    } catch (error) {
      console.error("Invalid coupon code:", error);
      setDiscount(0);
    }
  };

  const handleProceedToPayment = async () => {
    if (!user) {
      alert("You must be logged in to proceed to payment.");
      navigate("/login");
      return;
    }
    try {
      const customerId = user.email; // Replace with actual customer ID
      const products = cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      const MRP = calculateTotal();
      const shipping = MRP > 500 ? 0 : 50;
      const totalAmount = MRP - discount + shipping;

      const { street, city, state, postalCode, phone } = address;
      const fullAddress = `${street}, ${city}, ${state}, ${postalCode}`;

      const orderResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/payment/create-order`,
        {
          customerId,
          products,
          totalAmount,
          address: fullAddress,
          phoneNumber: phone,
          couponCode: coupon,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const order = orderResponse.data;
      const options = {
        key: `${process.env.REACT_APP_RAZORPAY_KEY}`,
        amount: order.amount,
        currency: order.currency,
        name: "The Millet Odyssey",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (response) => {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;
          const verifyResponse = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/api/payment/verify-payment`,
            {
              razorpayOrderId: razorpay_order_id,
              razorpayPaymentId: razorpay_payment_id,
              razorpaySignature: razorpay_signature,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );

          if (verifyResponse.data === "Payment verified successfully") {
            alert("Payment successful!");
            clearCart();
            setCartCount(0);
            navigate("/orders");
          } else {
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone,
        },
        notes: {
          address: fullAddress,
        },
        theme: {
          color: "#CF7D08",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in proceeding to payment:", error);
      alert("Error in proceeding to payment. Please try again.");
    }
  };

  const MRP = calculateTotal();
  const shipping = MRP > 500 ? 0 : 50;
  const total = MRP - discount + shipping;
  const effectiveMRP = cartItems.length > 0 ? MRP : 0;
  const effectiveDiscount = cartItems.length > 0 ? discount : 0;
  const effectiveShipping = cartItems.length > 0 ? shipping : 0;
  const effectiveTotal = cartItems.length > 0 ? total : 0;

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => handleDrawerToggle(false)}
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        width="400px"
        role="presentation"
      >
        <Box
          width="100%"
          sx={{
            backgroundColor: "#CF7D08",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            <ArrowBackIcon
              onClick={() => handleDrawerToggle(false)}
              style={{ cursor: "pointer" }}
            />
            Shopping Cart ({cartItems.length}{" "}
            {cartItems.length === 1 ? "item" : "items"})
          </Typography>
          <Link to="/wishlist">
            <Button variant="h5" sx={{ color: "white", fontSize: "0.8rem" }}>
              View Wishlist <WishlistIcon />
            </Button>
          </Link>
        </Box>
        <Box p={2} flex="1" overflow="auto">
          {cartItems.length === 0 ? (
            <Typography variant="body1" sx={{ color: "black" }}>
              Your cart is empty
            </Typography>
          ) : (
            cartItems.map((item, index) => (
              <Box key={index} mb={2}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{ width: "80px", height: "80px" }}
                  />
                  <Box ml={2} flex="1">
                    <Typography variant="subtitle1" sx={{ color: "black" }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black" }}>
                      ₹ {item.price}
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <IconButton
                        onClick={() => {
                          handleQuantityChange(item, item.quantity - 1);
                          decreaseCartCount();
                        }}
                        disabled={item.quantity === 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body2" sx={{ color: "black" }}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        onClick={() => {
                          handleQuantityChange(item, item.quantity + 1);
                          increaseCartCount();
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <IconButton
                    onClick={() => {
                      handleRemoveItem(item);
                      decreaseCartCount();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Divider />
              </Box>
            ))
          )}
        </Box>
        <Box p={2} border="1px solid #ddd" borderRadius="5px">
          <Typography variant="body2" sx={{ color: "black" }}>
            Coupons
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Enter coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            sx={{ marginBottom: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleApplyCoupon}
            sx={{ backgroundColor: "#CF7D08" }}
          >
            Apply
          </Button>
        </Box>
        <Box p={2} border="1px solid #ddd" borderRadius="5px">
          <Typography variant="body2" sx={{ color: "black" }}>
            Shipping Address
          </Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Street"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            sx={{ marginBottom: 1, width: "100%" }}
          />
          <TextField
            variant="outlined"
            size="small"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            sx={{ marginBottom: 1, width: "100%" }}
          />
          <TextField
            variant="outlined"
            size="small"
            placeholder="State"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            sx={{ marginBottom: 1, width: "100%" }}
          />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
            sx={{ marginBottom: 1, width: "100%" }}
          />
          <TextField
            variant="outlined"
            size="small"
            placeholder="Phone Number"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            sx={{ marginBottom: 1, width: "100%" }}
          />
        </Box>
        <Box p={2} border="1px solid #CF7D08" borderRadius="5px">
          <Typography variant="body2" sx={{ color: "black" }}>
            MRP: ₹ {effectiveMRP.toFixed(2)}
          </Typography>
          <Typography variant="body2" sx={{ color: "black" }}>
            Discount: - ₹ {effectiveDiscount.toFixed(2)}
          </Typography>
          <Typography variant="body2" sx={{ color: "black" }}>
            Shipping: ₹ {effectiveShipping.toFixed(2)}
          </Typography>
          <Typography variant="h6" sx={{ color: "black", fontWeight: "bold" }}>
            You Pay: ₹ {effectiveTotal.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
          <Button
            variant="contained"
            color="warning"
            sx={{ backgroundColor: "#CF7D08", fontWeight: "bold" }}
            onClick={handleProceedToPayment}
          >
            Proceed
            <ArrowForwardIcon />
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Drawercart;
