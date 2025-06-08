import React, { useState } from 'react';
import {
  AppBar, Box, Button, Container, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Paper, Toolbar, Typography, CardMedia
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu'; // Assuming you use this for drawer
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Assuming for drawer
import VerifiedIcon from '@mui/icons-material/Verified';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Import logos (ensure paths are correct or manage them globally)
import petanNaikLogo from '../images/petannaik_logo.png';
import usericon from '../images/usericon.png';

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    totalCartQuantity, 
    cartSubtotal, 
    cartTotal,
    parsePrice 
  } = useCart();
  const { isLoggedIn, user, logout } = useAuth();

  // Header states (similar to Home.js and Chatbot.js for consistency)
  const [languageMenu, setLanguageMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const openProfileMenu = Boolean(profileMenuAnchorEl);

  // Checkout state
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const handleProfileMenuOpen = (event) => setProfileMenuAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setProfileMenuAnchorEl(null);
  const handleLogout = () => {
    logout();
    navigate('/');
    handleProfileMenuClose();
  };
  const handleLanguageClick = (event) => setLanguageMenu(event.currentTarget);
  const handleLanguageClose = () => setLanguageMenu(null);

  const menuItems = [ // Consistent menu items
    { text: 'Home', link: '/' },
    { text: 'Products', link: '/products' }, // Assuming /products route exists
    { text: 'Recommendations', link: '/recommendations' }, // Assuming route
    { text: 'Chatbot', link: '/chatbot' },
    { text: 'Profile', link: '/profile' },
    { text: 'About', link: '/about' }, // Assuming route
  ];

  const handleCheckout = () => {
    // In a real app, this would involve payment processing, order creation, etc.
    // For now, we'll just clear the cart and show a success message.
    clearCart();
    setCheckoutComplete(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  if (checkoutComplete) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', textAlign: 'center', p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#166534', fontWeight: 'bold' }}>
          Thank You For Your Order!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Your order has been placed successfully.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 3, bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }}}>
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Sidebar Navigation (Drawer) - Similar to Home.js */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
            width: drawerOpen ? 240 : 0,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
                bgcolor: '#166534', // Match theme
                color: 'white',
                borderRight: 'none'
            },
        }}
      >
        <Box sx={{ 
            p: 2, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)' 
        }}>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>Menu</Typography>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}>
                <ChevronLeftIcon />
            </IconButton>
        </Box>
        <List>
            {menuItems.map((item) => (
                <ListItem key={item.text} button onClick={() => { navigate(item.link); setDrawerOpen(false); }}
                    sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' }}}
                >
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </List>
      </Drawer>

      {/* Replicated Header - Consider making this a common component */}
      <AppBar position="static" sx={{ bgcolor: '#166534' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setDrawerOpen(!drawerOpen)} sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }} edge="start">
            <MenuIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => setDrawerOpen(!drawerOpen)} sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Box component="img" src={petanNaikLogo} alt="PetanNaik Logo" sx={{ height: 40, width: 70, mr: 1 }} />
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>PetanNaik</Typography>
              <Typography variant="caption" sx={{ display: 'block', lineHeight: 1 }}>by SawitPRO</Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {menuItems.map((item) => (
              <Button key={item.text} color="inherit" onClick={() => navigate(item.link)} sx={{ mx: 1, fontWeight: 'medium' }}>
                {item.text}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" onClick={handleLanguageClick} sx={{ mr: 1 }}>English</Button>
            <Menu anchorEl={languageMenu} open={Boolean(languageMenu)} onClose={handleLanguageClose}>
              <MenuItem onClick={handleLanguageClose}>English</MenuItem>
              <MenuItem onClick={handleLanguageClose}>Bahasa Indonesia</MenuItem>
            </Menu>
            {isLoggedIn ? (
              <>
                <IconButton color="inherit" sx={{ mr: 2 }} onClick={handleProfileMenuOpen}>
                  <Box component="img" src={usericon} alt="Profile" sx={{ width: 32, height: 32, borderRadius: '50%' }} />
                </IconButton>
                <Menu anchorEl={profileMenuAnchorEl} open={openProfileMenu} onClose={handleProfileMenuClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                  <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
                <IconButton color="inherit" sx={{ mr: 1 }}><VerifiedIcon /></IconButton>
              </>
            ) : (
              <Button variant="contained" onClick={() => navigate('/login')} sx={{ bgcolor: '#eab308', color: 'black', fontWeight: 'bold', '&:hover': { bgcolor: '#ca8a04' }, mr: 2 }}>
                Login
              </Button>
            )}
            <IconButton color="inherit" sx={{ position: 'relative' }} onClick={() => navigate('/cart')}>
              <ShoppingCartIcon />
              {totalCartQuantity > 0 && (
                <Box sx={{ position: 'absolute', top: 0, right: 0, bgcolor: '#eab308', color: 'black', borderRadius: '50%', width: 18, height: 18, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                  {totalCartQuantity}
                </Box>
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ py: 4, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#166534', textAlign: 'center', mb: 4 }}>
          Shopping Cart
        </Typography>

        {cartItems.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Your cart is empty.</Typography>
            <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2, bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }}}>
              Continue Shopping
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items List */}
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <List>
                  {cartItems.map((item) => (
                    <React.Fragment key={item.id}>
                      <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          sx={{ width: 100, height: 100, objectFit: 'cover', mr: 2, borderRadius: 1 }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" component="div">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{formatCurrency(parsePrice(item.price))}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)} size="small" sx={{ color: '#166534' }}>
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                            <Typography sx={{ mx: 1.5, fontWeight: 'medium' }}>{item.quantity}</Typography>
                            <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)} size="small" sx={{ color: '#166534' }}>
                              <AddCircleOutlineIcon />
                            </IconButton>
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                           <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {formatCurrency(parsePrice(item.price) * item.quantity)}
                           </Typography>
                           <IconButton onClick={() => removeFromCart(item.id)} color="error" size="small" sx={{mt:1}}>
                             <DeleteIcon />
                           </IconButton>
                        </Box>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Order Summary - Receipt Style */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ 
                p: 3, 
                fontFamily: 'monospace', // For receipt feel
                border: '1px dashed #166534',
                bgcolor: '#f8f9fa'
              }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#166534', textAlign: 'center', fontFamily: 'inherit' }}>
                  Order Summary
                </Typography>
                <Divider sx={{ my: 2 }} />
                {cartItems.map(item => (
                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, fontSize: '0.9rem', fontFamily: 'inherit' }}>
                        <Typography variant="body2" sx={{fontFamily: 'inherit'}}>
                            {item.name} (x{item.quantity})
                        </Typography>
                        <Typography variant="body2" sx={{fontFamily: 'inherit'}}>{formatCurrency(parsePrice(item.price) * item.quantity)}</Typography>
                    </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1, fontFamily: 'inherit' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'inherit' }}>Subtotal</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'inherit' }}>{formatCurrency(cartSubtotal)}</Typography>
                </Box>
                {/* Placeholder for Shipping & Tax */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1, color: 'text.secondary', fontFamily: 'inherit' }}>
                  <Typography variant="body2" sx={{fontFamily: 'inherit'}}>Shipping</Typography>
                  <Typography variant="body2" sx={{fontFamily: 'inherit'}}>FREE</Typography> 
                </Box>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1, color: 'text.secondary', fontFamily: 'inherit' }}>
                  <Typography variant="body2" sx={{fontFamily: 'inherit'}}>Tax (Est.)</Typography>
                  <Typography variant="body2" sx={{fontFamily: 'inherit'}}>{formatCurrency(0)}</Typography> 
                </Box>
                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, fontFamily: 'inherit' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}>{formatCurrency(cartTotal)}</Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleCheckout}
                  sx={{ mt: 3, py: 1.5, bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }, fontWeight: 'bold' }}
                >
                  Proceed to Checkout
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>

      {/* Replicated Footer - Consider making this a common component */}
      <Box sx={{ bgcolor: '#1e293b', color: 'white', py: 6, mt: 'auto' }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box component="img" src={petanNaikLogo} alt="PetanNaik Logo" sx={{ height: 40, width: 70, mr: 1 }} />
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>PetanNaik</Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 2 }}>Trusted e-commerce platform for small-scale palm oil farmers in Indonesia.</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Products</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Fertilizers & Nutrition</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Pesticides</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Farming Tools</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Premium Seeds</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Services</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>PalmPilot Consultation</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>AI Recommendations</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Farming Guides</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Technical Support</Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Contact</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><EmailIcon sx={{ mr: 1, fontSize: 18 }} /><Typography variant="body2">info@petannaik.com</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><PhoneIcon sx={{ mr: 1, fontSize: 18 }} /><Typography variant="body2">+62 21 1234 5678</Typography></Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><LocationOnIcon sx={{ mr: 1, fontSize: 18 }} /><Typography variant="body2">Jakarta, Indonesia</Typography></Box>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 2, textAlign: 'center' }}>
            <Typography variant="body2">© {new Date().getFullYear()} PetanNaik by SawitPRO. All rights reserved.</Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default CartPage;