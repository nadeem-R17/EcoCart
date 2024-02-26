import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../assets/BASE_URL';

const OrderHistory = () => {
  const userId = localStorage.getItem("userId");
  const [history, setHistory] = useState([]);
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const fetchHistory = async () => {
    try {
      console.log("Fetching history...");
      const res = await axios.get(`${BASE_URL}/orders/history`, {
        params: {
          userId: userId,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log("History fetched:", res.data);
      setHistory(res.data);
    } catch (e) {
      console.log("Error fetching history:", e);
    }
  };

  const fetchedProducts = async () => {
    try {
      console.log("Fetching product details...");
      const details = await Promise.all(
        history.flatMap((order) =>
          order.products.map((product) =>
            axios
              .get(`${BASE_URL}/items/products/${product.product}`, {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              .then((res) => res.data)
          )
        )
      );
      console.log("Product details fetched:", details);
      setProductDetails(details);
      setLoading(false);
    } catch (e) {
      console.log("Error fetching product details:", e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchHistory();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (history.length > 0) {
      fetchedProducts();
    }
  }, [history]);

  useEffect(() => {
    console.log("Product details:", productDetails);
  }, [productDetails]);

  return (
    <div>
      <Typography
        variant="h1"
        sx={{ color: "#3f51b5", marginBottom: 2, textAlign: "center" }}
      >
        Order History
      </Typography>

      {loading ? (
        <Box sx={{display: "flex", justifyContent: "center"}}>

        <Box sx={{padding: 2,
          border: "1px solid #ddd",
          borderRadius: 2,
          marginBottom: 2,
            bgcolor: "white",
            display: "flex",
            flexDirection: "column",
          justifyContent: "center"}}>

            <Typography variant="h4" margin={6}>No Orders Yet</Typography>
            <Button color="secondary" onClick={()=>navigate("/home")}>
              Continue Shopping
            </Button>
        </Box>
            </Box>
      ) : (
        history.map((order, index) => (
          <Box
            key={index}
            border={1}
            padding={2}
            marginBottom={2}
            sx={{
              display: "list-item",
              justifyContent: "center",
              bgcolor: "#F5F5DC",
            }}
          >
            <Box
              sx={{
                padding: 2,
                border: "1px solid #ddd",
                borderRadius: 2,
                marginBottom: 2,
                bgcolor: "white",
              }}
            >
              <Typography variant="h5" sx={{ marginBottom: 1 }}>
                Order {index + 1}
              </Typography>
              <Typography variant="h6" sx={{ marginBottom: 0.5 }}>
                Shipping Address
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                Full Name: {order.shippingAddress.fullName}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                Address: {order.shippingAddress.address}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                City: {order.shippingAddress.city}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                Postal Code: {order.shippingAddress.postalcode}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                Country: {order.shippingAddress.country}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                Ordered At: {new Date(order.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                Total Price: {order.totalPrice }
              </Typography>
            </Box>
            <Box>
              {order.products.map((productId) => {
                const product = productDetails.find(
                  (product) => product.product._id === productId.product
                );
                return product ? (
                  <Box key={product.product._id}>
                    <ProductCards product={product} />
                  </Box>
                ) : null;
              })}
            </Box>
          </Box>
        ))
      )}
    </div>
  );
};

function ProductCards({ product }) {
  const navigate = useNavigate();
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item xs={6} sm={4} md={3} lg={2.4} xl={2}>
        <Card
          onClick={() =>
            navigate("/details", {
              state: { product: product.product },
            })
          }
          sx={{
            display: "flex",
            flexDirection: "row",
            width: 312,
            m: 1,
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
            },
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            image={product.product.image}
            alt="Product Image"
            sx={{ width: 76, objectFit: "cover" }}
          />
          <CardContent
            sx={{
              flex: 1,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: "medium",
                fontSize: 16,
                color: "#141414",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: "100%",
                height: "50%",
              }}
            >
              {product.product.name}
            </Typography>
            <Typography
              variant="body3"
              sx={{
                fontFamily: "'Work Sans', sans-serif",
                fontWeight: "medium",
                fontSize: 14,
                color: "#3D4D5C",
                height: "50%",
              }}
            >
              ${product.product.price}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default OrderHistory;
