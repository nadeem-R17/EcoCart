import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  TextField,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import EmptyCart from "./EmptyCart";
import ClearIcon from "@mui/icons-material/Clear";
import { CartContext } from "../CartContext";
import { BASE_URL } from "../assets/BASE_URL";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Cart = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);

  const fetchUser = () => {
    axios
      .get(`${BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        setProducts({});
        console.log("No data found or error");
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user && user.cartItems) {
      const requests = user.cartItems.map((item) => {
        return axios.get(`${BASE_URL}/items/products/${item.product}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      });

      Promise.all(requests)
        .then((responses) => {
          const fetchedProducts = responses.map((res, index) => {
            return {
              ...res.data,
              quantity: user.cartItems[index].quantity,
            };
          });
          setProducts(fetchedProducts);
        })
        .catch((e) => {
          console.log("No data found or error");
        });
    }
  }, [user]);

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const total = products.reduce(
      (total, product) => total + product.product.price * product.quantity,
      0
    );
    setTotalPrice(total);
  }, [products]);

  return (
    <div>
      {!user || !user.cartItems || !user.cartItems.length ? (
        <>
          <Box sx={{ paddingTop: "64px" }} />
          <EmptyCart />
        </>
      ) : (
        <>
          <Box
            sx={{
              marginTop: "64px",
              px: "5px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: "30vw" }}>
              <ShippingAddress
                userId={userId}
                products={products}
                totalPrice={totalPrice}
              />
            </Box>
            <Box sx={{ width: "20vw", paddingRight: 4 }}>
              <Grid container direction="column" spacing={1}>
                {products.map((product) => (
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    lg={2.4}
                    xl={2}
                    key={product._id}
                  >
                    <ProductCard product={product} userId={userId} />
                  </Grid>
                ))}

                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Total Price</TableCell>
                        <TableCell>${totalPrice}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Box>
          </Box>
          <Button onClick={() => navigate("/home")}>Go to Home</Button>
        </>
      )}
    </div>
  );
};

function ProductCard({ product, userId }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { setCount, cartCount } = useContext(CartContext);
  const [productQuantity, setProductQuantity] = useState(product.quantity);
  const removeItem = (productId) => {
    axios
      .delete(`${BASE_URL}/orders/cart`, {
        data: {
          productId: productId,
          userId: userId,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log("Success:", response.data);
        const newCount = cartCount > 0 ? cartCount - product.quantity : 0;
        setCount(newCount);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

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
        const newCartCount = cartCount + 1;
        setCount(newCartCount);
        setProductQuantity((prev) => prev + 1);
      })
      .catch((e) => {
        console.log("No data found or error");
      });
  };

  const removeSingleItem = (productId) => {
    axios
      .put(
        `${BASE_URL}/orders/cart/decrease`,
        {
          productId: productId,
          userId: userId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log("Success:", response.data);
        const newCount = cartCount > 0 ? cartCount - 1 : 0;
        setCount(newCount);
        const prevCount = productQuantity > 0 ? productQuantity - 1 : 0;
        setProductQuantity(prevCount);
        if (prevCount === 0) window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Card
        key={product.product._id}
        onClick={() =>
          navigate("/details", {
            state: { product: product.product },
          })
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          display: "flex",
          width: 312,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
          },
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
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
          {isHovered && (
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                removeItem(product.product._id);
              }}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "red",
              }}
            >
              <ClearIcon />
            </IconButton>
          )}
        </CardContent>
      </Card>
      <IconButton onClick={() => removeSingleItem(product.product._id)}>
        <RemoveIcon />
      </IconButton>
      <Button color="secondary" variant="contained" sx={{ borderRadius: 10 }}>
        {productQuantity}
      </Button>
      <IconButton onClick={() => addToCart(product.product._id)}>
        <AddIcon />
      </IconButton>
    </>
  );
}

function ShippingAddress({ userId, totalPrice }) {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const { setCount } = useContext(CartContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const shippingAddress = {
      fullName,
      address,
      city,
      postalcode,
      country,
    };
    axios
      .post(
        `${BASE_URL}/orders/buy`,
        {
          userId,
          shippingAddress,
          totalPrice,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setCount(0);
        window.location.reload();
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isOnlyNumbers = (str) => {
    return /^\d+$/.test(str) || str === "";
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Shipping Address Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Postal Code"
              variant="outlined"
              fullWidth
              value={postalcode}
              onChange={(e) => {
                if (isOnlyNumbers(e.target.value)) {
                  setPostalCode(e.target.value);
                }
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Country"
              variant="outlined"
              fullWidth
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Cart;
