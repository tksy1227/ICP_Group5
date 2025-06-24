import React, { useState } from 'react';
import {
  Box, Button, Container, Grid, Paper, Typography, Card, CardContent, CardMedia, CardActions, Rating, IconButton, 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Icon for recommendations
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
// Import new guide images
import NPKGoldImage from '../images/guides/NPKGold.jpg';
import LeafSpotImage from '../images/guides/LeafSpot.jpg';
import HarvestingImage from '../images/guides/Harvesting.jpg';

// Import product images from ProductContext.js (same as Home.js for consistency)
import sawitproFertilizer50kgPlus40kgBunchAshImage from '../images/products/SawitPRO_Fertilizer_50kg_+_40kg_Bunch_Ash.avif';
import siBrondolSawitproTshirtSizeXlImage from '../images/products/Si_Brondol_SawitPRO_T-shirt_size_XL.avif';
import furadan3gr2kgImage from '../images/products/Furadan_3GR_2Kg.avif';

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useLanguage } from '../contexts/LanguageProvider';
// Placeholder data for recommendations - replace with actual logic later
const sampleRecommendations = [
  {
    id: 'rec1',
    title: 'boostYieldWithNPKGold', // Key for translation
    description: 'Our top-rated NPK Gold fertilizer is showing excellent results for farmers in your region. Consider it for your next fertilization cycle.',
    image: NPKGoldImage,
    link: '/recommendations/npk-gold-guide',
    category: 'Fertilizer'
  },
  {
    id: 'rec2', 
    title: 'combatLeafSpotEffectively', // Key for translation
    description: 'Seeing signs of leaf spot? Our new systemic fungicide provides long-lasting protection. Learn more about application techniques.', 
    image: LeafSpotImage,
    link: '/recommendations/leaf-spot-guide',
    category: 'Pest Control'
  },
  {
    id: 'rec3', 
    title: 'optimalHarvestingGuide', // Key for translation
    description: 'Maximize your oil extraction rates by following our updated guide on optimal harvesting times and techniques.', 
    image: HarvestingImage,
    link: '/recommendations/harvesting-guide',
    category: 'Farming Practices'
  }
];

// Replicating recommendedProducts data from Home.js
const recommendedProductsData = [
  {
    product_id: "sawitpro-fertilizer-bunch-ash",
    name: "SawitPRO Fertilizer 50kg + 40kg Bunch Ash",
    description: "High quality fertilizer with bunch ash.",
    price: 'Rp 315.934',
    image: sawitproFertilizer50kgPlus40kgBunchAshImage,
    rating: 4.5
  },
  {
    product_id: "sibrondol-tshirt-xl",
    name: "Si Brondol SawitPRO T-shirt size XL",
    description: "Comfortable T-shirt from SawitPRO.",
    price: 'Rp 85.000',
    image: siBrondolSawitproTshirtSizeXlImage,
    rating: 4.3
  },
  {
    product_id: "furadan-3gr-2kg",
    name: "Furadan 3GR 2Kg",
    description: "Effective insecticide.",
    price: 'Rp 54.503',
    image: furadan3gr2kgImage,
    rating: 4.6
  }
];

const RecommendationsPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // 'user' and 'logout' are not used here
  const { cartItems, addToCart, updateQuantity, parsePrice } = useCart();
  const { translations } = useLanguage();

  const formatCurrency = (amount) => { // Helper for displaying price
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Recommendations Content */}
      <Container sx={{ py: 4, flexGrow: 1 }} maxWidth="xl"> {/* Adjusted padding and maxWidth */}

        {!isLoggedIn && (
          <Paper elevation={2} sx={{ p: 3, mb: 4, textAlign: 'center', bgcolor: '#f0fdf4' }}>
            <Typography variant="h6" sx={{ color: '#15803d', mb:1 }}> {/* Use translations.recommendations.personalizedRecommendations */}
              {translations.recommendations.personalizedRecommendations}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}> {/* Use translations.recommendations.loginToReceiveSuggestions */}
              {translations.recommendations.loginToReceiveSuggestions}
            </Typography>
            <Button variant="contained" onClick={() => navigate('/login')} sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }}}>
              {translations.recommendations.loginOrSignUp}
            </Button>
          </Paper>
        )}

        {/* Section for Recommended Products (like Home page) - MOVED UP */}
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#166534', textAlign: 'center', mb: 2 }}> {/* Changed to h3, adjusted mb */}
          {translations.recommendations.youMightAlsoLike}
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }} justifyContent="center"> {/* Added justifyContent */}
          {recommendedProductsData.map((product) => {
            const cartItem = cartItems.find(item => item.id === product.product_id); // Match by product_id
            const productPrice = parsePrice(product.price); // Ensure price is a number for calculations
            return (
              <Grid item xs={12} sm={6} md={4} key={product.product_id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {product.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" component="p" sx={{ color: '#22c55e', fontWeight: 'bold' }}>
                        {formatCurrency(productPrice)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating value={product.rating} precision={0.1} readOnly size="small" />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>{product.rating}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {cartItem ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, mr: 1 }}>
                       <IconButton onClick={() => updateQuantity(product.product_id, cartItem.quantity - 1)} size="small" sx={{ color: '#166534' }}>
                           <RemoveCircleOutlineIcon />
                        </IconButton>
                        <Typography sx={{ mx: 1, fontWeight: 'bold', color: '#166534' }}>{cartItem.quantity}</Typography>
                        <IconButton onClick={() => updateQuantity(product.product_id, cartItem.quantity + 1)} size="small" sx={{ color: '#166534' }} aria-label="increase quantity">
                          <AddCircleOutlineIcon />
                        </IconButton>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        startIcon={<ShoppingCartIcon  />}
                        onClick={() => addToCart({ ...product, id: product.product_id, price: productPrice })} // Pass product with id and numeric price
                        sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }, flexGrow: 1, mr: 1 }}
                      >
                        {translations.products.addToCart}
                      </Button>
                    )}
                    <IconButton 
                        sx={{ bgcolor: '#f0fdf4', color: '#22c55e', '&:hover': { bgcolor: '#dcfce7' }, ml: cartItem ? 0 : 1 }} 
                        onClick={() => navigate(`/products/${product.product_id}`)} // Navigate to product detail
                        aria-label="view product">
                      <VisibilityIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        {/* "Farming Recommendations" title and sub-heading moved here */}
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#166534', textAlign: 'center', mt: 6, mb: 2 }}> {/* Changed to h4, adjusted margins */}
          {translations.recommendations.generalFarmingInsights}
        </Typography>
        <Typography variant="h6" component="p" color="text.secondary" sx={{ textAlign: 'center', mb: 4, maxWidth: '800px', mx: 'auto' }}> {/* Changed to h6, adjusted margins */}
          {translations.recommendations.exploreGuides}
        </Typography>
        <Grid container spacing={3} justifyContent="center"> {/* Added justifyContent */}
          {sampleRecommendations.map((rec) => (
            <Grid item xs={12} sm={6} md={4} key={rec.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={rec.image}
                  alt={rec.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="overline" color="text.secondary">
                    {rec.category}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2" // Use translations.recommendations[rec.title]
                    sx={{
                      fontWeight: 'bold', // Use translations.recommendations[rec.title]
                      color: '#166534',
                      display: '-webkit-box',
                      WebkitLineClamp: 2, // Max 2 lines for title
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      minHeight: `calc(1.25rem * 1.6 * 2)`, // Approx. for h6 (adjust if line-height is different)
                    }}> {translations.recommendations[rec.title]}
                    {rec.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3, // Max 3 lines for description
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      minHeight: `calc(1rem * 1.5 * 3)`, // Approx. for body2 (adjust if line-height is different)
                  }}> {/* Description is hardcoded in sampleRecommendations, could be moved to translations if needed */}
                    {rec.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    size="small" 
                    variant="outlined" 
                    onClick={() => navigate(rec.link)}
                    sx={{ borderColor: '#22c55e', color: '#22c55e', '&:hover': { borderColor: '#16a34a', bgcolor: '#f0fdf4' } }}
                  >
                    {translations.recommendations.learnMore}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{textAlign: 'center', mt: 5}}>
            <Typography variant="h6" sx={{mb: 2}}>{translations.recommendations.needSpecificAdvice}</Typography>
            <Button variant="contained" size="large" onClick={() => navigate('/chatbot')} startIcon={<LightbulbIcon />} sx={{ bgcolor: '#eab308', color: 'black', '&:hover': { bgcolor: '#ca8a04' }}}> {/* Use translations.recommendations.askPalmpilot */}
                {translations.recommendations.askPalmpilot}
            </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RecommendationsPage;