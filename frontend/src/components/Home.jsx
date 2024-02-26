import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  Container,
  IconButton,
  CssBaseline,
} from "@mui/material";
import heroImage from "../assets/shop.jpg";
import { TypeAnimation } from "react-type-animation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { BASE_URL } from "../assets/BASE_URL";

const Home = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [isHovered, setIsHovered] = useState(false);
  const [products, setProducts] = useState([]);
  const fetchProducts = () => {
    axios
      .get(`${BASE_URL}/items/products`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((e) => {
        setProducts([]);
        console.log("No data found or error");
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);

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

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Kitchen",
    "Books & Media",
    "Health & Beauty",
    "Sports & Outdoors",
    "Toys & Games",
    "Food & Groceries",
  ];

  return (
    <div>
      <Box
        sx={{
          backgroundImage: `url(${heroImage})`,
          color: "#fff",
          p: 4,
          mb: 2,
          height: "50vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          <TypeAnimation
            sequence={[
              "Welcome to EcoCart",
              1000,
              "The home for shopping",
              1000,
              "Welcome to EcoCart",
            ]}
            speed={10}
            repeat={Infinity}
          />
        </Typography>
      </Box>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ maxWidth: 960 }}>
        {categories.map((category) => {
          const categoryItems = products.filter(
            (product) => product.category === category
          );
          console.log(categoryItems);
          const [isHoveredText, setIsHoveredText] = useState(false);
          return (
            <Box>
              <Box sx={{ position: "relative" }}>
                <IconButton
                  onClick={() =>
                    navigate("/product", { state: { category, categoryItems } })
                  }
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 50,
                    m: 1.5,
                    backgroundColor: "white",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#1db7cf",
                      color: "white",
                      transition:
                        "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
                    },
                  }}
                >
                  <Typography>View More</Typography>
                  <KeyboardDoubleArrowRightIcon />
                </IconButton>
                <CssBaseline />
                <Box
                  onMouseEnter={() => setIsHoveredText(true)}
                  onMouseLeave={() => setIsHoveredText(false)}
                  sx={{ p: 4, display: "flex", justifyContent: "center" }}
                >
                  <Typography
                    variant="h4"
                    component="h2"
                    gutterBottom
                    color="#1db7cf"
                  >
                    {category}
                  </Typography>
                  {isHoveredText && (
                    <IconButton
                      onClick={() =>
                        navigate("/product", {
                          state: { category, categoryItems },
                        })
                      }
                      sx={{
                        color: "#1db7cf",
                        width: "48px",
                        height: "48px",
                        backgroundColor: "#f5f5f5",
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
                        },
                      }}
                    >
                      <ChevronRightIcon fontSize="large" />
                    </IconButton>
                  )}
                </Box>
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
                {categoryItems.slice(0, 5).map((product) => (
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
                      onClick={() =>
                        navigate("/details", { state: { product } })
                      }
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
                                  backgroundColor: "#1db7cf",
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
            </Box>
          );
        })}
      </Container>
    </div>
  );
};

export default Home;
