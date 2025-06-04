import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const PRODUCT_DATA = [
    ["0bd2430a-6613-442a-9d5a-11d64cb095ae", "Kaos SIBRONDOL SawitPRO size XL", 100000],
    ["1033503b-8faa-4d5c-97c2-50bb19fbb897", "TSP China Cap Daun 50kg", 945000],
    // ... add all your product data here
].map(([product_id, name, price]) => ({ product_id, name, price }));

export const ProductProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);

    const addToCart = (product) => {
        setCart(prev => [...prev, product]);
    };

    const addToRecentActivity = (product) => {
        setRecentActivity(prev => [product, ...prev]);
    };

    return (
        <ProductContext.Provider value={{ 
            products: PRODUCT_DATA,
            cart,
            addToCart,
            recentActivity,
            addToRecentActivity
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);