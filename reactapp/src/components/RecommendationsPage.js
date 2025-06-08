import React, { useState } from 'react';
import {
  AppBar, Box, Button, Container, Drawer, Grid, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Paper, Toolbar, Typography, Card, CardContent, CardMedia, CardActions, Rating
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import VerifiedIcon from '@mui/icons-material/Verified';
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Icon for recommendations
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import petanNaikLogo from '../images/petannaik_logo.png';
import usericon from '../images/usericon.png';

// Placeholder data for recommendations - replace with actual logic later
const sampleRecommendations = [
  {
    id: 'rec1',
    title: 'Boost Your Yield with NPK Gold',
    description: 'Our top-rated NPK Gold fertilizer is showing excellent results for farmers in your region. Consider it for your next fertilization cycle.',
    image: 'https://images.unsplash.com/photo-1635188557504-7cc236e3d0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', // Placeholder
    link: '/products', // Link to product or product page
    category: 'Fertilizer'
  },
  {
    id: 'rec2',
    title: 'Combat Leaf Spot Effectively',
    description: 'Seeing signs of leaf spot? Our new systemic fungicide provides long-lasting protection. Learn more about application techniques.',
    image: 'https://images.unsplash.com/photo-1620453325704-70e446e3c4c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', // Placeholder
    link: '/products',
    category: 'Pest Control'
  },
  {
    id: 'rec3',
    title: 'Optimal Harvesting Guide',
    description: 'Maximize your oil extraction rates by following our updated guide on optimal harvesting times and techniques.',
    image: 'https://images.unsplash.com/photo-1598887142487-3c854d51d2c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60', // Placeholder
    link: '/guides/harvesting', // Link to a guide page (hypothetical)
    category: 'Farming Practices'
  }
];

// Replicating recommendedProducts data from Home.js
const recommendedProductsData = [
  {
    product_id: "0bd2430a-6613-442a-9d5a-11d64cb095ae", // Using actual product_id
    name: 'Premium Palm Oil NPK Fertilizer',
    description: 'Specialized palm oil fertilizer with balanced NPK content',
    price: 'Rp 125.000', // Keep as string if parsePrice is used, or convert to number
    image: 'https://images.unsplash.com/photo-1635188557504-7cc236e3d0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    rating: 4.8
  },
  {
    product_id: "1033503b-8faa-4d5c-97c2-50bb19fbb897", // Using actual product_id
    name: 'Organic Caterpillar Pesticide',
    description: 'Eco-friendly pesticide for caterpillar pest control',
    price: 'Rp 85.000',
    image: 'https://images.unsplash.com/photo-1620453325704-70e446e3c4c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    rating: 4.6
  },
  {
    product_id: "0bd2430a-6613-442a-9d5a-11d64cb095ae", // Placeholder, replace with another valid ID
    name: 'Palm Fruit Harvesting Tool',
    description: 'Ergonomic harvesting tool to improve efficiency',
    price: 'Rp 450.000',
    image: 'https://images.unsplash.com/photo-1598887142487-3c854d51d2c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    rating: 4.9
  }
];
const RecommendationsPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const { totalCartQuantity, cartItems, addToCart, updateQuantity, parsePrice } = useCart();
  
  const [languageMenu, setLanguageMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const openProfileMenu = Boolean(profileMenuAnchorEl);

  const handleProfileMenuOpen = (event) => setProfileMenuAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileMenuAnchorEl(null);
  const handleLogout = () => {
    logout();
    navigate('/');
    handleProfileMenuClose();
  };
  const handleLanguageClick = (event) => setLanguageMenu(event.currentTarget);
  const handleLanguageClose = () => setLanguageMenu(null);

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Products', link: '/products' },
    { text: 'Recommendations', link: '/recommendations' },
    { text: 'Chatbot', link: '/chatbot' },
    { text: 'Profile', link: '/profile' },
    { text: 'About', link: '/about' },
  ];

  const formatCurrency = (amount) => { // Helper for displaying price
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Drawer */}
      <Drawer
        variant="persistent" anchor="left" open={drawerOpen}
        sx={{ width: drawerOpen ? 240 : 0, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', bgcolor: '#166534', color: 'white', borderRight: 'none' } }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>Menu</Typography>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}><ChevronLeftIcon /></IconButton>
        </Box>
        <List>
            {menuItems.map((item) => (
                <ListItem key={item.text} button onClick={() => { navigate(item.link); setDrawerOpen(false); }} sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' }}}>
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </List>
      </Drawer>

      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: '#166534' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setDrawerOpen(!drawerOpen)} sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }} edge="start"><MenuIcon /></IconButton>
          <IconButton color="inherit" onClick={() => setDrawerOpen(!drawerOpen)} sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}><MenuIcon /></IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Box component="img" src={petanNaikLogo} alt="PetanNaik Logo" sx={{ height: 40, width: 70, mr: 1 }} />
            <Box><Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>PetanNaik</Typography><Typography variant="caption" sx={{ display: 'block', lineHeight: 1 }}>by SawitPRO</Typography></Box>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {menuItems.map((item) => (<Button key={item.text} color="inherit" onClick={() => navigate(item.link)} sx={{ mx: 1, fontWeight: 'medium' }}>{item.text}</Button>))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" onClick={handleLanguageClick} sx={{ mr: 1 }}>English</Button>
            <Menu anchorEl={languageMenu} open={Boolean(languageMenu)} onClose={handleLanguageClose}><MenuItem onClick={handleLanguageClose}>English</MenuItem><MenuItem onClick={handleLanguageClose}>Bahasa Indonesia</MenuItem></Menu>
            {isLoggedIn ? (
              <><IconButton color="inherit" sx={{ mr: 2 }} onClick={handleProfileMenuOpen}><Box component="img" src={usericon} alt="Profile" sx={{ width: 32, height: 32, borderRadius: '50%' }} /></IconButton>
              <Menu anchorEl={profileMenuAnchorEl} open={openProfileMenu} onClose={handleProfileMenuClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}><MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>Profile</MenuItem><MenuItem onClick={handleLogout}>Logout</MenuItem></Menu>
              <IconButton color="inherit" sx={{ mr: 1 }}><VerifiedIcon /></IconButton></>
            ) : (<Button variant="contained" onClick={() => navigate('/login')} sx={{ bgcolor: '#eab308', color: 'black', fontWeight: 'bold', '&:hover': { bgcolor: '#ca8a04' }, mr: 2 }}>Login</Button>)}
            <IconButton color="inherit" sx={{ position: 'relative' }} onClick={() => navigate('/cart')}>
              <ShoppingCartIcon />
              {totalCartQuantity > 0 && (<Box sx={{ position: 'absolute', top: 0, right: 0, bgcolor: '#eab308', color: 'black', borderRadius: '50%', width: 18, height: 18, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{totalCartQuantity}</Box>)}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Recommendations Content */}
      <Container sx={{ py: 4, flexGrow: 1 }} maxWidth="xl"> {/* Adjusted padding and maxWidth */}

        {!isLoggedIn && (
          <Paper elevation={2} sx={{ p: 3, mb: 4, textAlign: 'center', bgcolor: '#f0fdf4' }}>
            <Typography variant="h6" sx={{ color: '#15803d', mb:1 }}>
              Want personalized recommendations?
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Log in to receive suggestions based on your specific needs and past interactions.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/login')} sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }}}>
              Login or Sign Up
            </Button>
          </Paper>
        )}

        {/* Section for Recommended Products (like Home page) - MOVED UP */}
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#166534', textAlign: 'center', mb: 2 }}> {/* Changed to h3, adjusted mb */}
          You Might Also Like
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
                  <CardActions sx={{ p: 2, pt: 0, display: 'flex' }}>
                    {cartItem ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, mr: 1 }}>
                        <IconButton onClick={() => updateQuantity(product.product_id, cartItem.quantity - 1)} size="small" sx={{ color: '#166534' }} aria-label="reduce quantity">
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
                        startIcon={<ShoppingCartIcon />}
                        onClick={() => addToCart({ ...product, id: product.product_id, price: productPrice })} // Pass product with id and numeric price
                        sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }, flexGrow: 1, mr: 1 }}
                      >
                        Add to Cart
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
          General Farming Insights
        </Typography>
        <Typography variant="h6" component="p" color="text.secondary" sx={{ textAlign: 'center', mb: 4, maxWidth: '800px', mx: 'auto' }}> {/* Changed to h6, adjusted margins */}
          Explore guides and tips to enhance your farming practices.
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
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      color: '#166534',
                      display: '-webkit-box',
                      WebkitLineClamp: 2, // Max 2 lines for title
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      minHeight: `calc(1.25rem * 1.6 * 2)`, // Approx. for h6 (adjust if line-height is different)
                    }}>
                    {rec.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3, // Max 3 lines for description
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      minHeight: `calc(1rem * 1.5 * 3)`, // Approx. for body2 (adjust if line-height is different)
                  }}>
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
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{textAlign: 'center', mt: 5}}>
            <Typography variant="h6" sx={{mb: 2}}>Need more specific advice?</Typography>
            <Button 
                variant="contained" 
                size="large" 
                onClick={() => navigate('/chatbot')}
                startIcon={<LightbulbIcon />}
                sx={{ bgcolor: '#eab308', color: 'black', '&:hover': { bgcolor: '#ca8a04' } }}
            >
                Ask PalmPilot Assistant
            </Button>
        </Box>

      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1e293b', color: 'white', py: 6, mt: 'auto' }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}><Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}><Box component="img" src={petanNaikLogo} alt="PetanNaik Logo" sx={{ height: 40, width: 70, mr: 1 }} /><Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>PetanNaik</Typography></Box><Typography variant="body2" sx={{ mb: 2 }}>Trusted e-commerce platform for small-scale palm oil farmers in Indonesia.</Typography></Grid>
            <Grid item xs={12} md={3}><Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Products</Typography><Typography variant="body2" sx={{ mb: 1 }}>Fertilizers & Nutrition</Typography><Typography variant="body2" sx={{ mb: 1 }}>Pesticides</Typography><Typography variant="body2" sx={{ mb: 1 }}>Farming Tools</Typography><Typography variant="body2" sx={{ mb: 1 }}>Premium Seeds</Typography></Grid>
            <Grid item xs={12} md={3}><Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Services</Typography><Typography variant="body2" sx={{ mb: 1 }}>PalmPilot Consultation</Typography><Typography variant="body2" sx={{ mb: 1 }}>AI Recommendations</Typography><Typography variant="body2" sx={{ mb: 1 }}>Farming Guides</Typography><Typography variant="body2" sx={{ mb: 1 }}>Technical Support</Typography></Grid>
            <Grid item xs={12} md={3}><Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Contact</Typography><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><EmailIcon sx={{ mr: 1, fontSize: 18 }} /><Typography variant="body2">info@petannaik.com</Typography></Box><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><PhoneIcon sx={{ mr: 1, fontSize: 18 }} /><Typography variant="body2">+62 21 1234 5678</Typography></Box><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><LocationOnIcon sx={{ mr: 1, fontSize: 18 }} /><Typography variant="body2">Jakarta, Indonesia</Typography></Box></Grid>
          </Grid>
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 2, textAlign: 'center' }}><Typography variant="body2">© {new Date().getFullYear()} PetanNaik by SawitPRO. All rights reserved.</Typography></Box>
        </Container>
      </Box>
    </Box>
  );
};

export default RecommendationsPage;