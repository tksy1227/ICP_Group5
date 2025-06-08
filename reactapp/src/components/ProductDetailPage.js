import React, { useState, useEffect } from 'react';
import {
  AppBar, Box, Button, Container, Drawer, Grid, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Paper, Toolbar, Typography, Rating, CardMedia, Card, CardContent, CardActions, Divider
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import petanNaikLogo from '../images/petannaik_logo.png';
import usericon from '../images/usericon.png';

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { isLoggedIn, user, logout } = useAuth();
  const { totalCartQuantity, cartItems, addToCart, updateQuantity, parsePrice } = useCart();
  const { getProductById, products: allProducts } = useProducts(); // Get allProducts

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [frequentlyBought, setFrequentlyBought] = useState([]);

  const [languageMenu, setLanguageMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const openProfileMenu = Boolean(profileMenuAnchorEl);

  useEffect(() => {
    const foundProduct = getProductById(productId);
    if (foundProduct) {
      // Simulate fetching richer details if they were separate
      setProduct({
        ...foundProduct,
        // image: `https://via.placeholder.com/600x400/22c55e/ffffff?text=${encodeURIComponent(foundProduct.name.substring(0,20))}`, // Keep original image from context
        // Use description and rating from ProductContext if available, otherwise fallback
        description: foundProduct.description || `Detailed description for ${foundProduct.name}. This product is known for its quality and effectiveness in palm oil farming.`,
        rating: foundProduct.rating || 4.5, // Default rating
        reviews: foundProduct.reviews || Math.floor(Math.random() * 100) + 5, // Random review count
      });

      // Logic for frequently bought together
      const otherProducts = allProducts
        .filter(p => p.product_id !== productId)
        .sort(() => 0.5 - Math.random()) // Shuffle for variety
        .slice(0, 3); // Take up to 3 other products

      setFrequentlyBought(otherProducts.map(p => ({
        ...p,
        // image: `https://via.placeholder.com/300x200/22c55e/ffffff?text=${encodeURIComponent(p.name.substring(0,15))}`, // Keep original image from context
        rating: p.rating || (Math.random() * (5 - 3.5) + 3.5).toFixed(1), // Random rating
      })));
    }
    setLoading(false);
  }, [productId, getProductById, allProducts]);

  const handleProfileMenuOpen = (event) => setProfileMenuAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileMenuAnchorEl(null);
  const handleLogout = () => { logout(); navigate('/'); handleProfileMenuClose(); };
  const handleLanguageClick = (event) => setLanguageMenu(event.currentTarget);
  const handleLanguageClose = () => setLanguageMenu(null);

  const menuItems = [
    { text: 'Home', link: '/' }, { text: 'Products', link: '/products' },
    { text: 'Recommendations', link: '/recommendations' }, { text: 'Chatbot', link: '/chatbot' },
    { text: 'Profile', link: '/profile' }, { text: 'About', link: '/about' },
  ];

  const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Typography>Loading product details...</Typography></Box>;
  }

  if (!product) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Typography>Product not found.</Typography></Box>;
  }

  const cartItem = cartItems.find(item => item.id === product.product_id || item.id === product.id); // Check both possible id fields
  const currentProductPrice = typeof product.price === 'string' ? parsePrice(product.price) : product.price;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Drawer */}
      <Drawer variant="persistent" anchor="left" open={drawerOpen} sx={{ width: drawerOpen ? 240 : 0, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', bgcolor: '#166534', color: 'white', borderRight: 'none' } }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}><Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>Menu</Typography><IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}><ChevronLeftIcon /></IconButton></Box>
        <List>{menuItems.map((item) => (<ListItem key={item.text} button onClick={() => { navigate(item.link); setDrawerOpen(false); }} sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' } }}><ListItemText primary={item.text} /></ListItem>))}</List>
      </Drawer>

      {/* Header */}
      <AppBar position="static" sx={{ bgcolor: '#166534' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setDrawerOpen(!drawerOpen)} sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }} edge="start"><MenuIcon /></IconButton>
          <IconButton color="inherit" onClick={() => setDrawerOpen(!drawerOpen)} sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}><MenuIcon /></IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}><Box component="img" src={petanNaikLogo} alt="PetanNaik Logo" sx={{ height: 40, width: 70, mr: 1 }} /><Box><Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>PetanNaik</Typography><Typography variant="caption" sx={{ display: 'block', lineHeight: 1 }}>by SawitPRO</Typography></Box></Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>{menuItems.map((item) => (<Button key={item.text} color="inherit" onClick={() => navigate(item.link)} sx={{ mx: 1, fontWeight: 'medium' }}>{item.text}</Button>))}</Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" onClick={handleLanguageClick} sx={{ mr: 1 }}>English</Button><Menu anchorEl={languageMenu} open={Boolean(languageMenu)} onClose={handleLanguageClose}><MenuItem onClick={handleLanguageClose}>English</MenuItem><MenuItem onClick={handleLanguageClose}>Bahasa Indonesia</MenuItem></Menu>
            {isLoggedIn ? (<><IconButton color="inherit" sx={{ mr: 2 }} onClick={handleProfileMenuOpen}><Box component="img" src={usericon} alt="Profile" sx={{ width: 32, height: 32, borderRadius: '50%' }} /></IconButton><Menu anchorEl={profileMenuAnchorEl} open={openProfileMenu} onClose={handleProfileMenuClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}><MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>Profile</MenuItem><MenuItem onClick={handleLogout}>Logout</MenuItem></Menu><IconButton color="inherit" sx={{ mr: 1 }}><VerifiedIcon /></IconButton></>) : (<Button variant="contained" onClick={() => navigate('/login')} sx={{ bgcolor: '#eab308', color: 'black', fontWeight: 'bold', '&:hover': { bgcolor: '#ca8a04' }, mr: 2 }}>Login</Button>)}
            <IconButton color="inherit" sx={{ position: 'relative' }} onClick={() => navigate('/cart')}><ShoppingCartIcon />{totalCartQuantity > 0 && (<Box sx={{ position: 'absolute', top: 0, right: 0, bgcolor: '#eab308', color: 'black', borderRadius: '50%', width: 18, height: 18, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{totalCartQuantity}</Box>)}</IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Product Detail Content */}
      <Container sx={{ py: 4, flexGrow: 1 }} maxWidth="lg">
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2, color: '#166534' }}>
          Back to Products
        </Button>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ width: '100%', maxHeight: 500, objectFit: 'contain', borderRadius: 2, border: '1px solid #eee' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#166534' }}>
                {product.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating name="read-only" value={product.rating} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.reviews} reviews)
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ color: '#22c55e', fontWeight: 'bold', mb: 2 }}>
                {formatCurrency(currentProductPrice)}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
                {product.description}
              </Typography>
              
              {cartItem ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <IconButton onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)} size="small" sx={{ color: '#166534', border: '1px solid #ddd' }}><RemoveCircleOutlineIcon /></IconButton>
                  <Typography sx={{ mx: 1, fontWeight: 'bold', fontSize: '1.2rem' }}>{cartItem.quantity}</Typography>
                  <IconButton onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)} size="small" sx={{ color: '#166534', border: '1px solid #ddd' }}><AddCircleOutlineIcon /></IconButton>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => addToCart({ ...product, id: product.product_id, price: currentProductPrice })} // Ensure correct id and numeric price
                  sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }, py: 1.5, px: 4, fontSize: '1rem', mb: 2 }}
                >
                  Add to Cart
                </Button>
              )}
              {/* Placeholder for more details like specifications, brand, etc. */}
              <Typography variant="caption" display="block" sx={{mt: 2, color: 'text.disabled'}}>Product ID: {product.product_id}</Typography>

              {/* Frequently Bought Together Section - MOVED HERE */}
              {isLoggedIn && frequentlyBought.length > 0 && (
                <Box sx={{ mt: 4 }}> {/* Changed Grid item to Box and adjusted margin */}
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#166534', mb: 3 }}>
                    Frequently Bought Together
                  </Typography>
                  <Grid container spacing={3} justifyContent="center" alignItems="stretch"> {/* Explicitly set alignItems */}
                    {frequentlyBought.map((freqProduct) => {
                      const freqCartItem = cartItems.find(item => item.id === freqProduct.product_id);
                      const freqProductPrice = typeof freqProduct.price === 'string' ? parsePrice(freqProduct.price) : freqProduct.price;

                      return (
                        <Grid item xs={12} sm={6} md={4} key={freqProduct.product_id}> {/* Adjusted md breakpoint for better fit if needed */}
                          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 380 /* Adjusted minHeight slightly */ }}>
                            <CardMedia // Image
                              component="img"
                              height="180" // Adjusted height for consistency
                              image={freqProduct.image}
                              alt={freqProduct.name}
                              sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 'medium', minHeight: '3.2em', /* approx 2 lines for 1rem font with 1.6 line-height */ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                {freqProduct.name}
                              </Typography>
                              <Typography variant="body1" color="#166534" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {formatCurrency(freqProductPrice)}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Rating name={`rating-${freqProduct.product_id}`} value={parseFloat(freqProduct.rating)} precision={0.1} readOnly size="small" />
                              </Box>
                            </CardContent>
                            <CardActions sx={{ p: 2, pt: 0, mt: 'auto' /* Push actions to bottom */ }}>
                              {freqCartItem ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                  <IconButton onClick={() => updateQuantity(freqProduct.product_id, freqCartItem.quantity - 1)} size="small" sx={{ color: '#166534' }}><RemoveCircleOutlineIcon /></IconButton>
                                  <Typography sx={{ mx: 1.5, fontWeight: 'medium' }}>{freqCartItem.quantity}</Typography>
                                  <IconButton onClick={() => updateQuantity(freqProduct.product_id, freqCartItem.quantity + 1)} size="small" sx={{ color: '#166534' }}><AddCircleOutlineIcon /></IconButton>
                                </Box>
                              ) : (
                                <Button fullWidth variant="contained" startIcon={<ShoppingCartIcon />} onClick={() => addToCart({ ...freqProduct, id: freqProduct.product_id, price: freqProductPrice })} sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' } }}>
                                  Add to Cart
                                </Button>
                              )}
                            </CardActions>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
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

export default ProductDetailPage;