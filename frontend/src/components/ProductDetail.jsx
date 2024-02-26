import {
  Button,
  Typography,
  Box,
  Container,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import React, {useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { CartContext } from "../CartContext";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { BASE_URL } from '../assets/BASE_URL';

const ProductDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state.product;
  const userId = localStorage.getItem("userId");

  const { isAdmin } = useAuth();
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
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        console.log("No data found or error");
      });
  };
  return (
    <div>
      <Box sx={{ paddingTop: "94px" }}/>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Box>
          <Box>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Box
                      sx={{
                        color: "#fff",
                        p: 4,
                        mb: 2,
                        width: "1080px",
                        height: "524px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          my: 2,
                          width: 780,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Work Sans, sans-serif",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                          }}
                          color="grey"
                        >
                          {product.category}/
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: "Work Sans, sans-serif",
                            fontWeight: "bold",
                            fontSize: "1.5rem",
                          }}
                          color="black"
                        >
                          {product.brand}
                        </Typography>
                      </Box>
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        sx={{
                          fontFamily: "Work Sans, sans-serif",
                          fontWeight: "bold",
                          fontSize: "1.5rem",
                        }}
                        color="black"
                      >
                        {product.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {Array.from({ length: product.rating }).map(
                          (_, index) => (
                            <StarIcon key={index} sx={{ color: "gold" }} />
                          )
                        )}
                        <Typography color="black">
                          ({product.numRev})
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography
                      sx={{
                        fontFamily: "Work Sans, sans-serif",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                      }}
                      color="black"
                    >
                      ${product.price}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="black">{product.description}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography color="black">
                      Stocks remaining={product.stock}
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button onClick={() => navigate("/home")}>Go back</Button>
                      <Button
                        variant="contained"
                        onClick={() => addToCart(product._id, userId)}
                        sx={{
                          backgroundColor: "white",
                          color: "black",
                          width: "auto",
                          "&:hover": {
                            backgroundColor: "black",
                            color: "white",
                          },
                        }}
                      >
                        Add to cart
                      </Button>
                      {isAdmin && (
                        <Button
                          variant="contained"
                          onClick={() =>
                            navigate("/updateproduct", { state: { product } })
                          }
                          sx={{
                            backgroundColor: "white",
                            color: "black",
                            width: "auto",
                            "&:hover": {
                              backgroundColor: "black",
                              color: "white",
                            },
                          }}
                        >
                          Update
                        </Button>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default ProductDetail;
