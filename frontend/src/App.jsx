import React from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import PrivateRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";

import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import OrderHistory from "./components/OrderHistory";
import Product from "./components/Product";

function App() {
  return (
    <>
      <Router>
        <CartProvider>
          <AuthProvider>
            <NavbarWrapper />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/details" element={<ProductDetail />} />
                <Route path="/orders" element={<OrderHistory />} />
                <Route path="/product" element={<Product />} />
              </Route>
              <Route element={<AdminRoute />}>
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/updateproduct" element={<UpdateProduct />} />
              </Route>
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </AuthProvider>
        </CartProvider>
      </Router>
    </>
  );
}

const NavbarWrapper = () => {
  const location = useLocation();

  if (location.pathname === "/" || location.pathname === "/signup") {
    return null;
  }

  return <Navbar />;
};

export default App;
