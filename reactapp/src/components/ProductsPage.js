import React, { useState, useEffect, useMemo } from 'react';
import {
  AppBar, Box, Button, Container, Drawer, Grid, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Paper, Toolbar, Typography, Card, CardMedia, CardContent, CardActions, TextField, Select, InputLabel, FormControl, Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext'; // To get product list

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import VerifiedIcon from '@mui/icons-material/Verified';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Added import
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'; // Added import
import VisibilityIcon from '@mui/icons-material/Visibility'; 
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import petanNaikLogo from '../images/petannaik_logo.png';
import usericon from '../images/usericon.png';

const ProductsPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const { totalCartQuantity, addToCart, cartItems, updateQuantity, parsePrice } = useCart(); // Added parsePrice
  const { products } = useProducts(); // Get all products

  const [languageMenu, setLanguageMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const openProfileMenu = Boolean(profileMenuAnchorEl);

  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState(''); // e.g., '0-100000', '100000-500000'
  const [categoryFilter, setCategoryFilter] = useState(''); // Placeholder

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

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      let priceMatch = true;
      if (priceFilter) {
        const [min, max] = priceFilter.split('-').map(Number);
        if (max) { // Range
          priceMatch = product.price >= min && product.price <= max;
        } else { // Only min (treat as "above min") or specific "under" case
          if (priceFilter === 'under-100000') priceMatch = product.price < 100000;
          else if (priceFilter === 'above-1000000') priceMatch = product.price > 1000000;
          // Add more specific cases if needed, or adjust logic for single value filters
        }
      }
      // Add categoryMatch logic here when categories are implemented
      // const categoryMatch = categoryFilter ? product.category === categoryFilter : true;
      return nameMatch && priceMatch; // && categoryMatch;
    });
  }, [products, searchTerm, priceFilter, categoryFilter]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  // Placeholder categories - you'd fetch or define these properly
  const categories = [
    { value: 'fertilizer', label: 'Fertilizer' },
    { value: 'pesticide', label: 'Pesticide' },
    { value: 'tool', label: 'Tool' },
  ];

  const priceRanges = [
    { value: '', label: 'All Prices' },
    { value: 'under-100000', label: 'Under Rp 100.000' },
    { value: '100000-500000', label: 'Rp 100.000 - Rp 500.000' },
    { value: '500001-1000000', label: 'Rp 500.001 - Rp 1.000.000' },
    { value: 'above-1000000', label: 'Above Rp 1.000.000' },
  ];

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

      {/* Products Content */}
      <Container sx={{ py: 4, flexGrow: 1 }} maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#166534', textAlign: 'center', mb: 3 }}>
          Our Products
        </Typography>

        {/* Search and Filters */}
        <Paper elevation={2} sx={{ p: 2, mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label="Search Products"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} /> }}
            sx={{ flexGrow: 1, minWidth: '200px' }}
          />
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Price Range</InputLabel>
            <Select value={priceFilter} label="Price Range" onChange={(e) => setPriceFilter(e.target.value)}>
              {priceRanges.map(range => <MenuItem key={range.value} value={range.value}>{range.label}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Category (Placeholder)</InputLabel>
            <Select value={categoryFilter} label="Category (Placeholder)" onChange={(e) => setCategoryFilter(e.target.value)} disabled>
              <MenuItem value="">All Categories</MenuItem>
              {categories.map(cat => <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<FilterListIcon />} sx={{borderColor: '#166534', color:'#166534'}}>
            Apply Filters
          </Button>
        </Paper>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <Grid container spacing={3} justifyContent="center"> {/* Added justifyContent */}
            {filteredProducts.map((product) => {
              const cartItem = cartItems.find(item => item.product_id === product.product_id); // Assuming product_id from context
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={product.image} // Use actual product image
                      alt={product.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        sx={{
                          fontWeight: 'medium',
                          fontSize: '1.1rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2, // Show a maximum of 2 lines
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          minHeight: `calc(1.1rem * 1.6 * 2)`, // Reserve space for 2 lines (assuming default h6 line-height of 1.6)
                        }}>
                        {product.name}
                      </Typography>
                      <Typography variant="body1" color="#166534" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {formatCurrency(product.price)}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}> {/* Ensure actions are at bottom and aligned */}
                      {/* Left part: Add to Cart button OR Quantity Controls */}
                      <Box sx={{ flexGrow: 1, mr: 1, display: 'flex', justifyContent: cartItem ? 'center' : 'flex-start' }}> {/* Container for the main action */}
                        {cartItem ? (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={() => updateQuantity(product.product_id, cartItem.quantity - 1)} size="small" sx={{ color: '#166534' }}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <Typography sx={{ mx: 1.5, fontWeight: 'medium' }}>{cartItem.quantity}</Typography>
                            <IconButton onClick={() => updateQuantity(product.product_id, cartItem.quantity + 1)} size="small" sx={{ color: '#166534' }}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                          </Box>
                        ) : (
                          <Button
                            fullWidth // Make button take full width of its container
                            variant="contained"
                            startIcon={<ShoppingCartIcon />}
                            onClick={() => addToCart({ ...product, id: product.product_id, price: parsePrice(product.price)})} 
                            sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' } }}
                          >
                            Add to Cart
                          </Button>
                        )}
                      </Box>

                      {/* Right part: View Icon Button - Always visible */}
                      <IconButton 
                        sx={{ 
                          bgcolor: '#f0fdf4', 
                          color: '#22c55e', 
                          '&:hover': { bgcolor: '#dcfce7' },
                          flexShrink: 0 // Prevent icon button from shrinking
                        }} 
                        onClick={() => {
                          navigate(`/products/${product.product_id}`);
                          localStorage.setItem('currentProduct', JSON.stringify(product));
                        }} 
                        aria-label="view product">
                          <VisibilityIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">No products found matching your criteria.</Typography>
          </Paper>
        )}
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

export default ProductsPage;