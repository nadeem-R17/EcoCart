import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const initialCartCount = localStorage.getItem('cartCount') ? Number(localStorage.getItem('cartCount')) : 0;
    const [cartCount, setCartCount] = useState(initialCartCount);

    const setCount = (cartItemsCount) => {
        localStorage.setItem('cartCount', cartItemsCount);
        setCartCount(cartItemsCount);
    };

    const value = {
        cartCount,
        setCount,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};