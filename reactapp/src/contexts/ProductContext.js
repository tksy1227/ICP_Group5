import React, { createContext, useContext, useState } from 'react';

const ProductContext = createContext();

export const PRODUCT_DATA = [
    ["0bd2430a-6613-442a-9d5a-11d64cb095ae", "Premium Palm Oil NPK Fertilizer", 125000, "Specialized palm oil fertilizer with balanced NPK content for optimal growth and yield. Boosts fruit production and tree health.", 4.8],
    ["1033503b-8faa-4d5c-97c2-50bb19fbb897", "Organic Caterpillar Pesticide", 85000, "Eco-friendly and effective solution for controlling caterpillar infestations in palm oil plantations. Safe for the environment.", 4.6],
    ["2f6a1b3c-7e9d-4f0a-8c2b-5a9d1e8f3c7a", "Palm Fruit Harvesting Tool", 450000, "Ergonomic and durable harvesting tool designed to improve efficiency and reduce fruit damage during collection.", 4.9],
    ["3a4b5c6d-8e7f-6a5b-4c3d-2e1f0a9b8c7d", "High-Yield Palm Seeds (100 pack)", 750000, "Genetically superior palm oil seeds selected for high yield potential and disease resistance. Start your plantation with the best.", 4.7],
    ["4d5e6f7a-1b2c-3d4e-5f6a-7b8c9d0e1f2a", "Soil Moisture Meter", 220000, "Essential tool for accurately monitoring soil hydration levels, ensuring optimal irrigation and water management for your crops.", 4.3],
    // ... add all your product data here
].map(([product_id, name, price, description, rating]) => ({ product_id, name, price, description, rating }));

export const ProductProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);

    const addToCart = (product) => {
        setCart(prev => [...prev, product]);
    };

    const addToRecentActivity = (product) => {
        setRecentActivity(prev => [product, ...prev]);
    };

    const getProductById = (id) => {
        return PRODUCT_DATA.find(product => product.product_id === id);
    };

    return (
        <ProductContext.Provider value={{ 
            products: PRODUCT_DATA,
            cart,
            addToCart,
            recentActivity,
            addToRecentActivity,
            getProductById // Add getProductById to the context value
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);