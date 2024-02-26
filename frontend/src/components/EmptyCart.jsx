import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/bg.jpg";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop: "-128px",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          p: 5,
          borderRadius: 2,
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h3" component="h2" gutterBottom>
          Your Cart is Empty!
        </Typography>
        <Typography variant="body1">
          Add some items to your cart to proceed with the checkout.
        </Typography>
        <Button
          onClick={() => navigate("/home")}
          size="large"
          variant="contained"
          sx={{ mt: 3 }}
        >
          Continue Shopping
        </Button>
      </Box>
    </div>
  );
};

export default EmptyCart;
