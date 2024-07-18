import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import {
  Table,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
} from "@material-ui/core";
import Paper from "@mui/material/Paper";
import { Box, Typography, Button } from "@mui/material";
import "./ListItem.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export const OrderDetails = () => {
  const { orderId } = useParams();
  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState({});
  const [timeline, setTimeLine] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/order/${orderId}`
        );
        const orderData = await response.json();
        setDetail(orderData);
        setTimeLine(orderData.events);

        const productPromises = orderData.products.map(async (product) => {
          const productResponse = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/product/${product.productId}`
          );
          const productDetails = await productResponse.json();
          return { ...productDetails, quantity: product.quantity };
        });

        const productDetails = await Promise.all(productPromises);
        setProducts(productDetails);

        // Fetch all orders to determine the order number
        const ordersResponse = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/order/`
        );
        const ordersData = await ordersResponse.json();
        const orderIndex = ordersData.findIndex(
          (order) => order.id === orderId
        );
        setOrderNumber(orderIndex + 1); // Set the order number (1-based index)
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const handleProceedToPayment = async () => {
    try {
      const customerId = user.email; // Replace with actual customer ID
      const totalAmount =
        detail.totalAmount + (detail.totalAmount > 500 ? 0 : 50); // Include shipping

      const orderResponse = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/payment/create-order`,
        {
          customerId,
          products: detail.products,
          totalAmount,
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
        name: "Your Company Name",
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

  const shippingCost = detail?.totalAmount > 500 ? 0 : 50;
  const totalPaid = detail?.status === "UNPAID" ? 0 : detail?.totalAmount;

  return (
    <Container>
      <div className="order-card">
        <div>
          <h4>Order Number: {orderNumber}</h4>
          {/* <div>Delivered on: {detail?.Deliverydate ?? "---"}</div> */}
        </div>
        <div>
          <div style={{ fontWeight: "bold", fontSize: "large" }}>
            Mode of Payment
          </div>
          <div>RazorPay</div>
        </div>
        <div
          className="address-card"
          style={{ textWrap: "wrap", textOverflow: "ellipsis" }}
        >
          <div style={{ fontWeight: "bold", fontSize: "large" }}>Address:</div>
          <div style={{ textWrap: "wrap", textOverflow: "ellipsis" }}>
            {detail.address}
          </div>
          <div>{detail?.Address?.landmark}</div>
        </div>
      </div>
      <Row>
        <Container>
          <h5>All Products</h5>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Product Image</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.productId}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{ width: "50px", height: "50px" }}
                      />
                    </TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>{product.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Row>
      <div className="order-card1">
        <div></div>
        <div>
          <Box p={2} border="1px solid #CF7D08" borderRadius="5px">
            <Typography variant="body2" sx={{ color: "black" }}>
              MRP: ₹ {detail?.totalAmount}
            </Typography>
            <Typography variant="body2" sx={{ color: "black" }}>
              Discount: - ₹ {detail?.discount}
            </Typography>
            <Typography variant="body2" sx={{ color: "black" }}>
              Shipping: ₹ {shippingCost}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "black", fontWeight: "bold" }}
            >
              Total Paid: ₹ {totalPaid}
            </Typography>
            {detail?.status === "UNPAID" && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleProceedToPayment}
                sx={{ marginTop: 2 }}
              >
                Pay Now
              </Button>
            )}
          </Box>
        </div>
      </div>
    </Container>
  );
};
