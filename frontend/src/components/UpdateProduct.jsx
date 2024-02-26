import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { BASE_URL } from "../assets/BASE_URL";

const AddProduct = () => {
  const location = useLocation();
  const [currProduct, setCurrProduct] = useState(location.state.product);

  const [product, setProduct] = useState({
    image: currProduct.image,
    name: currProduct.name,
    brand: currProduct.brand,
    category: currProduct.category,
    description: currProduct.description,
    price: currProduct.price,
    rating: currProduct.rating,
    numRev: currProduct.numRev,
    stock: currProduct.stock,
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("updated product before ", product);
    e.preventDefault();
    axios
      .put(`${BASE_URL}/items/products/${currProduct._id}`, product, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setCurrProduct(res.data.product);
      })
      .catch((e) => {
        console.log(e);
        console.log("No data found or error");
      });
  };
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      <Box sx={{ width: "50%" }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            padding: 2,
            maxWidth: "100%",
          }}
        >
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              defaultValue={currProduct.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="brand"
              label="Brand"
              variant="outlined"
              defaultValue={currProduct.brand}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <TextField
              select
              name="category"
              label="Category"
              variant="outlined"
              fullWidth
              defaultValue={currProduct.category}
              onChange={handleChange}
            >
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Clothing">Clothing</MenuItem>
              <MenuItem value="Home & Kitchen">Home & Kitchen</MenuItem>
              <MenuItem value="Books & Media">Books & Media</MenuItem>
              <MenuItem value="Health & Beauty">Health & Beauty</MenuItem>
              <MenuItem value="Sports & Outdoors">Sports & Outdoors</MenuItem>
              <MenuItem value="Toys & Games">Toys & Games</MenuItem>
              <MenuItem value="Food & Groceries">Food & Groceries</MenuItem>
            </TextField>
            <TextField
              name="price"
              label="Price"
              variant="outlined"
              defaultValue={currProduct.price}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <TextField
            name="image"
            label="Image URL"
            variant="outlined"
            fullWidth
            defaultValue={currProduct.image}
            onChange={handleChange}
          />
          <TextField
            name="description"
            label="Description"
            variant="outlined"
            defaultValue={currProduct.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <TextField
              select
              name="rating"
              label="Rating"
              variant="outlined"
              fullWidth
              defaultValue={currProduct.rating}
              onChange={handleChange}
            >
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
              <MenuItem value="5">5</MenuItem>
            </TextField>
            <TextField
              name="numRev"
              label="Number of Reviews"
              variant="outlined"
              defaultValue={currProduct.numRev}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="stock"
              label="Stock"
              variant="outlined"
              defaultValue={currProduct.stock}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Update Product
          </Button>
        </Box>
      </Box>
      <Box>
        <ProductDesc product={currProduct} />
      </Box>
    </Box>
  );
};

function ProductDesc({ product }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  return (
    <div>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          width: "50vw",
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
                        mb: 2,
                        width: "540px",
                        height: "262px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{
                          width: 390,
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
                      <Button
                        variant="contained"
                        onClick={() => navigate("/home")}
                        sx={{
                          backgroundColor: "white",
                          color: "black",
                          width: "auto",
                          "&:hover": {
                            backgroundColor: "green",
                            color: "white",
                          },
                        }}
                      >
                        Go to Home
                      </Button>
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
}

export default AddProduct;
