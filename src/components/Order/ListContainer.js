import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Order.css";
import { AuthContext } from "../../context/AuthContext";

const ListContainer = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/order/`
        ); // Adjust the endpoint to match your backend
        const data = await response.json();
        const filteredOrders = data.filter(
          (order) => order.customerId === user.email
        );
        console.log(filteredOrders); // Debug: Check the structure of the fetched data
        setOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  // Return null or a loading spinner if the user is not yet available
  if (!user) {
    return null;
  }

  return (
    <div className="order-history-list">
      <div style={{ alignSelf: "center" }}>Order History</div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>OrderId</TableCell>
                <TableCell align="right">Customer Email</TableCell>
                <TableCell align="right">Total Amount</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Razorpay OrderId</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link
                      to={`/orderDetails/${order?.id}`}
                      className="order-link"
                    >
                      {index + 1}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{order?.customerId}</TableCell>
                  <TableCell align="right">{order?.totalAmount}</TableCell>
                  <TableCell align="right">{order?.status}</TableCell>
                  <TableCell align="right">{order?.razorpayOrderId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ListContainer;
