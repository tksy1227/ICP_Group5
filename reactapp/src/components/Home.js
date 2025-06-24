import React from 'react';
import {
  Box, // Removed unused imports: AppBar, Drawer, List, Menu, MenuItem, ListItem, ListItemText, Toolbar
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // Import useCart
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageProvider';
// Import logos like in Chatbot.js
import petanNaikLogo from '../images/petannaik_logo.png';
// Import product images from ProductContext.js
import sawitproFertilizer50kgPlus40kgBunchAshImage from '../images/products/SawitPRO_Fertilizer_50kg_+_40kg_Bunch_Ash.avif';
import siBrondolSawitproTshirtSizeXlImage from '../images/products/Si_Brondol_SawitPRO_T-shirt_size_XL.avif';
import furadan3gr2kgImage from '../images/products/Furadan_3GR_2Kg.avif';
import garlon670Ec1LiterImage from '../images/products/Garlon_670_EC_1Liter.avif';
import garlon670Ec100mlImage from '../images/products/Garlon_670_EC_100ml.avif';
import bombUp520Sl20LitersImage from '../images/products/Bomb_Up_520_SL_20Liters.avif';
import RefreshIcon from '@mui/icons-material/Refresh'; // Added missing import


function Home() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { cartItems, addToCart, updateQuantity, parsePrice } = useCart();
  const { translations } = useLanguage();
  
  const recommendedProducts = [
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
  const popularProducts = [
    {
      product_id: "garlon-670ec-1l",
      name: "Garlon 670 EC - 1 Liter",
      description: "Herbicide for broad-leaved weeds.",
      price: 'Rp 299.606',
      image: garlon670Ec1LiterImage,
      rating: 4.7
    },
    {
      product_id: "garlon-670ec-100ml",
      name: "Garlon 670 EC - 100ml",
      description: "Herbicide for broad-leaved weeds.",
      price: 'Rp 49.350',
      image: garlon670Ec100mlImage,
      rating: 4.7
    },
    {
      product_id: "bombup-520sl-20l",
      name: "Bomb Up 520 SL - 20 Liters",
      description: "Systemic herbicide.",
      price: 'Rp 1.021.558',
      image: bombUp520Sl20LitersImage,
      rating: 4.5
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box 
        sx={{ 
          bgcolor: '#22c55e', 
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}> {/* Use translations.home.welcomeTitle */}
            {translations.home.welcomeTitle}
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}> {/* Use translations.home.heroSubtitle */}
            Trusted E-commerce Platform for Palm Oil Farmers
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/products')} // Navigate to products page
              startIcon={<ShoppingCartIcon />}
              sx={{ 
                bgcolor: '#eab308', 
                color: 'black', 
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#ca8a04' },
                px: 3
              }}
            >
              {translations.home.startShopping}
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/about')} // Navigate to about page
              sx={{ 
                borderColor: 'white', 
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                px: 3
              }}
            >
              {translations.home.learnMore}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* AI Recommendations Section - Only shown when logged in */}
      {isLoggedIn && (
        <Container sx={{ py: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box 
              component="span" 
              sx={{ 
                display: 'inline-block', 
                width: 24, 
                height: 24, 
                bgcolor: '#eab308', 
                borderRadius: '50%', 
                mr: 1,
                transform: 'rotate(-20deg)'
              }}
            />
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
              {translations.home.aiRecommendationsTitle}
            </Typography>
          </Box>
          
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 800, mx: 'auto', textAlign: 'center' }}> {/* Use translations.home.aiRecommendationsSubtitle */}
            Based on the analysis of your plantation needs, we recommend these best products
          </Typography>
          
          <Grid container spacing={2} justifyContent="center">
            {recommendedProducts.map((product) => {
              const cartItem = cartItems.find(item => item.id === product.product_id); // Match by product_id
              return (
                <Grid item xs={12} sm={6} md={4} key={product.product_id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 10, 
                        left: 10, 
                        bgcolor: '#eab308', 
                        color: 'black',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        fontWeight: 'bold',
                        fontSize: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        zIndex: 1 // Ensure it's above the image
                      }}
                    >
                      <Box component="span" sx={{ fontSize: 16 }}>★</Box> {translations.home.recommended}
                    </Box>
                    
                    <CardMedia
                      component="img"
                      height="200"
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
                          {product.price}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating value={product.rating} precision={0.1} readOnly size="small" />
                          <Typography variant="body2" sx={{ ml: 0.5 }}>
                            {product.rating}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0, display: 'flex' }}>
                      {cartItem ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, mr: 1 }}>
                            <IconButton onClick={() => updateQuantity(product.product_id, cartItem.quantity - 1)} size="small" sx={{ color: '#22c55e' }} aria-label="reduce quantity">
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <Typography sx={{ mx: 1, fontWeight: 'bold', color: '#166534' }}>{cartItem.quantity}</Typography>
                            <IconButton onClick={() => updateQuantity(product.product_id, cartItem.quantity + 1)} size="small" sx={{ color: '#22c55e' }} aria-label="increase quantity">
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </Box>
                      ) : (
                        <Button 
                          variant="contained" 
                          startIcon={<ShoppingCartIcon />}
                          onClick={() => addToCart({ ...product, id: product.product_id, price: parsePrice(product.price) })}
                          sx={{ 
                            bgcolor: '#22c55e', 
                            '&:hover': { bgcolor: '#16a34a' },
                            flexGrow: 1,
                            mr: 1
                          }}
                        >
                          Add to Cart
                        </Button>
                      )}
                      <IconButton 
                        sx={{ 
                          bgcolor: '#f0fdf4', 
                          color: '#22c55e',
                          '&:hover': { bgcolor: '#dcfce7' }
                        }}
                        onClick={() => navigate(`/products/${product.product_id}`)} // Navigate to product detail
                        aria-label="view product"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button 
              variant="outlined" 
              startIcon={<RefreshIcon />}
              sx={{ 
                borderColor: '#22c55e', 
                color: '#22c55e',
                '&:hover': { borderColor: '#16a34a', bgcolor: '#f0fdf4' }
              }}
            >
              {translations.home.refreshRecommendations}
            </Button>
          </Box>
        </Container>
      )}

      {/* Popular Products Section */}
      <Container sx={{ py: 6, maxWidth: 'lg' }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
        > {/* Use translations.home.popularProductsTitle */}
          Popular Products
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {popularProducts.map((product) => {
            const cartItem = cartItems.find(item => item.id === product.product_id); // Match by product_id
            return (
              <Grid item xs={12} sm={6} md={4} key={product.product_id}>
                <Card
                  sx={{
                    height: '100%',
                    maxWidth: 320,
                    mx: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h3"
                      sx={{ fontWeight: 'bold' }}
                    >
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1 }}
                    >
                      {product.description}
                    </Typography>
                    {/* Corrected Price and Rating display, similar to recommendedProducts */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="h6" component="p" sx={{ color: '#22c55e', fontWeight: 'bold' }}>
                        {product.price}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Rating
                          value={product.rating}
                          precision={0.1}
                          readOnly
                          size="small"
                        />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                          {product.rating}
                        </Typography>
                      </Box>
                    </Box>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0, display: 'flex' }}>
                  {cartItem ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, mr: 1 }}>
                        <IconButton onClick={() => updateQuantity(product.product_id, cartItem.quantity - 1)} size="small" sx={{ color: '#22c55e' }} aria-label="reduce quantity">
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                        <Typography sx={{ mx: 1, fontWeight: 'bold', color: '#166534' }}>{cartItem.quantity}</Typography>
                        <IconButton onClick={() => updateQuantity(product.product_id, cartItem.quantity + 1)} size="small" sx={{ color: '#22c55e' }} aria-label="increase quantity">
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => addToCart({ ...product, id: product.product_id, price: parsePrice(product.price) })}
                      sx={{
                        bgcolor: '#22c55e',
                        '&:hover': { bgcolor: '#16a34a' },
                        flexGrow: 1,
                        mr: 1,
                      }}
                    >
                      Add to Cart
                    </Button>
                  )}
                  <IconButton
                    sx={{
                      bgcolor: '#f0fdf4',
                      color: '#22c55e',
                      '&:hover': { bgcolor: '#dcfce7' },
                    }}
                    onClick={() => navigate(`/products/${product.product_id}`)} // Navigate to product detail
                  >
                    <VisibilityIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
            )
          })}
        </Grid>
      </Container>

      {/* Why Choose PetanNaik Section */}
      <Box sx={{ 
        bgcolor: '#f0fdf4', 
        py: 10,
        px: 0,
        mx: -3,
        width: 'calc(100% + 24px)'
      }}>
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            component="h2" // Use translations.home.whyChoosePetanNaik
            sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
          >
            {translations.home.whyChoosePetanNaik}
          </Typography>

    <Grid container spacing={4} justifyContent="center">
      {[
        {
          icon: <SmartToyIcon sx={{ fontSize: 40, color: '#22c55e' }} />,
          title: translations.home.aiRecommendation,
          body: translations.home.aiRecommendationBody,
          bg: '#dcfce7',
        },
        {
          icon: <VerifiedIcon sx={{ fontSize: 40, color: '#eab308' }} />,
          title: translations.home.qualityProducts,
          body: translations.home.qualityProductsBody,
          bg: '#fef9c3',
        },
        {
          icon: <SupportAgentIcon sx={{ fontSize: 40, color: '#22c55e' }} />,
          title: translations.home.palmpilotAssistant,
          body: translations.home.palmpilotAssistantBody,
          bg: '#dcfce7',
        },
      ].map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card
            sx={{
              height: '100%',
              minHeight: 20,
              maxWidth: 300,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 3,
              textAlign: 'center',
            }}
          >
            <Box
              sx={{
                bgcolor: item.bg,
                borderRadius: '50%',
                p: 2,
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </Box>
            <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              {item.title} {/* This title should also come from translations.home */}
            </Typography>
            <Typography variant="body1">
              {item.body.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
        </Container>
      </Box>

    </Box>
  );
}

export default Home;