import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Tooltip,
  Container,
  Badge,
} from "@mui/material";
import Person2SharpIcon from "@mui/icons-material/Person2Sharp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreIcon from "@mui/icons-material/Store";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, isAdmin } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const settings = ["Orders", "Logout", "Cart"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (event) => {
    if (event.target.textContent === "Logout") {
      logout();
    } else if (event.target.textContent === "Cart") {
      navigate("/cart");
    } else if (event.target.textContent === "Orders") {
      navigate("/orders");
    }
    handleCloseUserMenu();
  };

  const handleOpenCart = () => {
    navigate("/cart");
  };

  const handleStore = () => {
    navigate("/addProduct");
  };

  const { cartCount } = useContext(CartContext);

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fff" }}>
      <Container maxWidth="auto">
        <Toolbar disableGutters>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography
              variant="h6"
              component="div"
              sx={{
                p: 1,
                color: "#000",
                fontFamily: "sans-serif",
                fontWeight: "bold",
                fontSize: 30,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
              onClick={() => navigate("/home")}
            >
              EcoCart
            </Typography>
            <Box sx={{ flexGrow: 0 }}>
              {isAdmin && (
                <IconButton onClick={handleStore} sx={{ paddingRight: 3 }}>
                  <StoreIcon
                    color="primary"
                    sx={{ color: "#000", fontSize: 40 }}
                  />
                </IconButton>
              )}
              <IconButton onClick={handleOpenCart} sx={{ paddingRight: 3 }}>
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon
                    color="primary"
                    sx={{ color: "#000", fontSize: 40 }}
                  />
                </Badge>
              </IconButton>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Person2SharpIcon
                    color="primary"
                    sx={{ color: "#000", fontSize: 40 }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleMenuClick}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
