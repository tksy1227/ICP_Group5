import React from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Drawer,
  Fab,
  Grid,
  IconButton,
  List,
  Menu,
  MenuItem,
  ListItem,
  ListItemText,
  Rating,
  Toolbar,
  Typography,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatIcon from '@mui/icons-material/Chat';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MenuIcon from '@mui/icons-material/Menu'; // Changed from KeyboardArrowDownIcon
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import RefreshIcon from '@mui/icons-material/Refresh';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import VerifiedIcon from '@mui/icons-material/Verified';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // Import useCart
import { useAuth } from '../contexts/AuthContext';
// Import logos like in Chatbot.js
import petanNaikLogo from '../images/petannaik_logo.png';
import usericon from '../images/usericon.png'; // Assuming this is the intended profile icon

function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth(); // Use AuthContext for login state and logout function
  const [languageMenu, setLanguageMenu] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false); // For the Drawer side menu
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = React.useState(null);
  const openProfileMenu = Boolean(profileMenuAnchorEl);
  const { cartItems, addToCart, updateQuantity, totalCartQuantity, parsePrice } = useCart(); // Use cart context, added parsePrice

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    navigate('/'); // Navigate to home page after logout, which will show login button
    handleProfileMenuClose();
  };
  const handleLanguageClick = (event) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageClose = () => {
    setLanguageMenu(null);
  };
  
  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Products', link: '/products' },
    { text: 'Recommendations', link: '/recommendations' },
    { text: 'Chatbot', link: '/chatbot' },
    { text: 'Profile', link: '/profile' },
    { text: 'About', link: '/about' },
  ];
  
  const recommendedProducts = [
    {
      product_id: "0bd2430a-6613-442a-9d5a-11d64cb095ae", // Using actual product_id from ProductContext
      name: 'Premium Palm Oil NPK Fertilizer',
      description: 'Specialized palm oil fertilizer with balanced NPK content',
      price: 'Rp 125.000',
      image: 'https://images.unsplash.com/photo-1635188557504-7cc236e3d0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.8,
      // Add other fields if your addToCart expects them, or ensure they are added before calling addToCart
    },
    {
      product_id: "1033503b-8faa-4d5c-97c2-50bb19fbb897", // Using actual product_id from ProductContext
      name: 'Organic Caterpillar Pesticide',
      description: 'Eco-friendly pesticide for caterpillar pest control',
      price: 'Rp 85.000',
      image: 'https://images.unsplash.com/photo-1620453325704-70e446e3c4c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.6
    },
    {
      // Assuming a third product_id exists in your ProductContext.PRODUCT_DATA or use one of the above for demo
      product_id: "0bd2430a-6613-442a-9d5a-11d64cb095ae", // Placeholder, replace with another valid ID
      name: 'Palm Fruit Harvesting Tool',
      description: 'Ergonomic harvesting tool to improve efficiency',
      price: 'Rp 450.000',
      image: 'https://images.unsplash.com/photo-1598887142487-3c854d51d2c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.9
    }
  ];
  const popularProducts = [
    {
      product_id: "1033503b-8faa-4d5c-97c2-50bb19fbb897", // Placeholder, replace with another valid ID
      name: 'NPK Fertilizer 15-15-15',
      description: 'NPK fertilizer with balanced composition for optimal palm oil growth',
      price: 'Rp 150.000',
      image: 'https://images.unsplash.com/photo-1635188557504-7cc236e3d0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.8
    },
    {
      product_id: "0bd2430a-6613-442a-9d5a-11d64cb095ae", // Placeholder, replace with another valid ID
      name: 'Systemic Fungicide',
      description: 'Fungicide to prevent and treat fungal diseases in palm oil',
      price: 'Rp 85.000',
      image: 'https://images.unsplash.com/photo-1620453325704-70e446e3c4c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.6
    },
    {
      product_id: "1033503b-8faa-4d5c-97c2-50bb19fbb897", // Placeholder, replace with another valid ID
      name: 'High-Quality Machete',
      description: 'Sharp and durable machete for garden maintenance',
      price: 'Rp 125.000',
      image: 'https://images.unsplash.com/photo-1598887142487-3c854d51d2c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      rating: 4.9
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Sidebar Navigation (Drawer) - Similar to Chatbot.js */}
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
                bgcolor: '#166534', // Match Chatbot.js Drawer color
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
                <ListItem 
                    key={item.text} 
                    button 
                    onClick={() => {
                        navigate(item.link);
                        setDrawerOpen(false);
                    }}
                    sx={{
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.08)'
                        }
                    }}
                >
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </List>
      </Drawer>

      {/* Header/Navigation */}
      <AppBar position="static" sx={{ bgcolor: '#166534' }}>
        <Toolbar>
          {/* Side Menu Button - For mobile and desktop, consistent with Chatbot.js */}
          <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }} // Show on mobile
          >
              <MenuIcon />
          </IconButton>
          <IconButton
              color="inherit"
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} // Show on desktop
          >
              <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Box 
              component="img" 
              src={petanNaikLogo} // Use imported logo
              alt="PetanNaik Logo"
              sx={{ height: 40, width: 70, mr: 1 }} // Match Chatbot.js logo size if desired
            />
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                PetanNaik
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', lineHeight: 1 }}>
                by SawitPRO
              </Typography>
            </Box>
          </Box>
          
          {/* Navigation Menu */}
          <Box sx={{ 
            flexGrow: 1, 
            display: { xs: 'none', md: 'flex' }, 
            justifyContent: 'center' 
          }}>
            {menuItems.map((item) => (
              <Button 
                key={item.text}
                color="inherit"
                onClick={() => navigate(item.link)}
                sx={{ mx: 1, fontWeight: 'medium' }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
          
          {/* Right Side - Language, Login, Cart */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              color="inherit" 
              onClick={handleLanguageClick}
              // endIcon={<KeyboardArrowDownIcon />} // KeyboardArrowDownIcon is used in Chatbot.js, keep if desired
              // For consistency with Chatbot.js, if it uses KeyboardArrowDownIcon for language, keep it.
              // If not, remove or change. Assuming Chatbot.js has it for language dropdown.
              sx={{ mr: 1 }}
            >
              English
            </Button>
            <Menu
              anchorEl={languageMenu}
              open={Boolean(languageMenu)}
              onClose={handleLanguageClose}
            >
              <MenuItem onClick={handleLanguageClose}>English</MenuItem>
              <MenuItem onClick={handleLanguageClose}>Bahasa Indonesia</MenuItem>
            </Menu>
            
            {isLoggedIn ? (
              <>
                <IconButton 
                  color="inherit" 
                  sx={{ mr: 2 }}
                  onClick={handleProfileMenuOpen}
                >
                  <Box 
                    component="img" 
                    src={usericon} // Use imported user icon
                    alt="Profile"
                    sx={{ width: 32, height: 32, borderRadius: '50%' }}
                  />
                </IconButton>
                <Menu
                  anchorEl={profileMenuAnchorEl}
                  open={openProfileMenu}
                  onClose={handleProfileMenuClose}
                  onClick={handleProfileMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                variant="contained" 
                onClick={() => navigate('/login')} // Navigate directly
                sx={{ 
                  bgcolor: '#eab308', 
                  color: 'black', 
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#ca8a04' },
                  mr: 2
                }}
              >
                Login
              </Button>
            )}
            
            {isLoggedIn && (
              <IconButton color="inherit" sx={{ mr: 1 }}>
                <VerifiedIcon />
              </IconButton>
            )}
            
            <IconButton 
              color="inherit" 
              sx={{ position: 'relative' }}
              onClick={() => navigate('/cart')} // Navigate to cart page
            >
              <ShoppingCartIcon />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bgcolor: '#eab308',
                  color: 'black',
                  borderRadius: '50%',
                  width: 18,
                  height: 18,
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                                    display: totalCartQuantity > 0 ? 'flex' : 'none',
                }}
              >
                                {totalCartQuantity}
              </Box>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

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
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Welcome to PetanNaik
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Trusted E-commerce Platform for Palm Oil Farmers
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              size="large"
              startIcon={<ShoppingCartIcon />}
              sx={{ 
                bgcolor: '#eab308', 
                color: 'black', 
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#ca8a04' },
                px: 3
              }}
            >
              Start Shopping
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              sx={{ 
                borderColor: 'white', 
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                px: 3
              }}
            >
              Learn More
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
              AI Recommendations for You
            </Typography>
          </Box>
          
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 800, mx: 'auto', textAlign: 'center' }}>
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
                      <Box component="span" sx={{ fontSize: 16 }}>★</Box> Recommended
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
              Refresh Recommendations
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
        >
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
            component="h2"
            sx={{ fontWeight: 'bold', textAlign: 'center', mb: 4 }}
          >
            Why Choose PetanNaik?
          </Typography>

    <Grid container spacing={4} justifyContent="center">
      {[
        {
          icon: <SmartToyIcon sx={{ fontSize: 40, color: '#22c55e' }} />,
          title: 'AI Recommendation',
          body: 'Smart recommendation system based on your\nspecific plantation needs',
          bg: '#dcfce7',
        },
        {
          icon: <VerifiedIcon sx={{ fontSize: 40, color: '#eab308' }} />,
          title: 'Quality Products',
          body: 'Only the best and most trusted products\nfor your plantation success',
          bg: '#fef9c3',
        },
        {
          icon: <SupportAgentIcon sx={{ fontSize: 40, color: '#22c55e' }} />,
          title: 'PalmPilot Assistant',
          body: 'Smart chatbot ready to help 24/7\nwith plantation consultations',
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
              {item.title}
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

      {/* Footer */}
      <Box sx={{ bgcolor: '#1e293b', color: 'white', py: 6, mt: 'auto' }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  component="img" 
                  src={petanNaikLogo} // Use imported logo
                  alt="PetanNaik Logo"
                  sx={{ height: 40, width: 70, mr: 1 }} // Consistent sizing with header
                />
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                  PetanNaik
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Trusted e-commerce platform for small-scale palm oil farmers in Indonesia.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Products
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Fertilizers & Nutrition</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Pesticides</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Farming Tools</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Premium Seeds</Typography>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Services
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>PalmPilot Consultation</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>AI Recommendations</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Farming Guides</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Technical Support</Typography>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Contact
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmailIcon sx={{ mr: 1, fontSize: 18 }} />
                <Typography variant="body2">info@petannaik.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PhoneIcon sx={{ mr: 1, fontSize: 18 }} />
                <Typography variant="body2">+62 21 1234 5678</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOnIcon sx={{ mr: 1, fontSize: 18 }} />
                <Typography variant="body2">Jakarta, Indonesia</Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
            </Typography>
          </Box>
        </Container> {/* Closes the Container started around line 564 */}
      </Box> {/* Closes the Footer Box started around line 563 */}
    </Box>
  );
}

export default Home;