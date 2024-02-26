import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import axios from "axios";
import { BASE_URL } from '../assets/BASE_URL';

const AddProduct = () => {
  const [product, setProduct] = useState({
    image: "",
    name: "",
    brand: "",
    category: "",
    description: "",
    price: "",
    rating: "",
    numRev: "",
    stock: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("product to send", product);
    axios
      .post(`${BASE_URL}/items/products`, product, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        // console.log(res.data);

        window.location.reload();
      })
      .catch((e) => {
        console.log(e);
        console.log("No data found or error");
      });
  };
  return (
    <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: 2,
          maxWidth: "auto",
          "& .MuiTextField-root": { m: 1 },
          "& .MuiButton-root": { mt: 2 },
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            name="brand"
            label="Brand"
            variant="outlined"
            onChange={handleChange}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            select
            name="category"
            label="Category"
            variant="outlined"
            defaultValue="Electronics"
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
            onChange={handleChange}
          />
        </Box>
        <TextField
          name="image"
          label="Image URL"
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            select
            name="rating"
            label="Rating"
            variant="outlined"
            defaultValue="5"
            onChange={handleChange}
            fullWidth
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
            onChange={handleChange}
            fullWidth
            />
          <TextField
            name="stock"
            label="Stock"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        </Box>
        <Button variant="contained" type="submit">
          Add Product
        </Button>
      </Box>
    </Container>
  );
};

export default AddProduct;
