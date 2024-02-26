import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import axios from "axios";
import { BASE_URL } from '../assets/BASE_URL';


const Product = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const category = location.state.category;
  const categoryItems = location.state.categoryItems;

  const [isHovered, setIsHovered] = useState();
  const { setCount } = useContext(CartContext);

  const addToCart = (productId) => {
    axios
      .post(
        `${BASE_URL}/orders/cart`,
        { productId, userId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setCount((prevCartCount) => prevCartCount + 1);
      })
      .catch((e) => {
        console.log("No data found or error");
      });
  };

  const [darkMode, setDarkMode] = useState(false);

 

  return (
    <div>
        <Container maxWidth="lg" sx={{ maxWidth: 960 }}>
          <Box>
            <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
              <Typography variant="h4" component="h2" gutterBottom>
                {category}
              </Typography>
            </Box>

            <Grid
              container
              spacing={2}
              sx={{
                margin: "2",
                px: "5px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {categoryItems.map((product) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2.4}
                  xl={2}
                  key={product._id}
                >
                  <Card
                    key={product._id}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => navigate("/details", { state: { product } })}
                    sx={{
                      width: 176,
                      height: 269,
                      border: "none",
                      transition: "transform 0.3s ease-in-out",
                      borderRadius: "10px",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      padding: "10px",
                      "&:hover": {
                        transform: "scale(1.1)",
                        bgcolor: "#F5F5DC",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.image}
                      alt="Product Image"
                      sx={{ width: 176, height: 176 }}
                    />
                    <CardContent
                      sx={{
                        position: "relative",
                        flex: "0.5",
                        backgroundColor: "rgba(255, 255, 255, 0)",
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
                          lineHeight: "1.5",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body3"
                        sx={{
                          fontFamily: "'Work Sans', sans-serif",
                          fontWeight: "medium",
                          fontSize: 14,
                          color: "#3D4D5C",
                          lineHeight: "1.5",
                        }}
                      >
                        ${product.price}
                      </Typography>
                      {isHovered && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                            opacity: 0,
                            transition: "opacity 0.5s ease",
                            "&:hover": {
                              opacity: 1,
                            },
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={(event) => {
                              event.stopPropagation();
                              addToCart(product._id);
                            }}
                            sx={{
                              backgroundColor: "white",
                              color: "black",
                              width: "auto",
                              "&:hover": {
                                backgroundColor: "black",
                                color: "white",
                                transition:
                                  "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
                              },
                            }}
                          >
                            Add to Cart
                          </Button>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/home")}
              >
                Home
              </Button>
            </Box>
          </Box>
        </Container>
    </div>
  );
};

export default Product;
