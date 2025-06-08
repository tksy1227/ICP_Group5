import React, { useState } from 'react';
import {
  AppBar, Box, Button, Container, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Paper, Toolbar, Typography, Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import VerifiedIcon from '@mui/icons-material/Verified';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import petanNaikLogo from '../images/petannaik_logo.png';
import usericon from '../images/usericon.png'; // Default user icon
import { useCart } from '../contexts/CartContext';

const AboutPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const { totalCartQuantity } = useCart();

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        sx={{
            width: drawerOpen ? 240 : 0, flexShrink: 0,
            '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', bgcolor: '#166534', color: 'white', borderRight: 'none' },
        }}
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
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>PetanNaik</Typography>
              <Typography variant="caption" sx={{ display: 'block', lineHeight: 1 }}>by SawitPRO</Typography>
            </Box>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            {menuItems.map((item) => (
              <Button key={item.text} color="inherit" onClick={() => navigate(item.link)} sx={{ mx: 1, fontWeight: 'medium' }}>{item.text}</Button>
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
              <Button variant="contained" onClick={() => navigate('/login')} sx={{ bgcolor: '#eab308', color: 'black', fontWeight: 'bold', '&:hover': { bgcolor: '#ca8a04' }, mr: 2 }}>Login</Button>
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

      {/* About Us Content */}
      <Box sx={{ 
        bgcolor: '#22c55e', // Same lime green as Home page hero section
        color: 'white', // Adjust text color for better contrast on green background
        py: 4, 
        flexGrow: 1 
      }}>
        <Container maxWidth="lg">
          {/* Adjusted text colors for visibility on green background */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'white', textAlign: 'center', mb: 3 }}>
          About PetanNaik
        </Typography>
        <Typography variant="h5" component="p" color="text.secondary" sx={{ textAlign: 'center', mb: 5, maxWidth: '800px', mx: 'auto',color: 'white' }}>
          Empowering Indonesian Palm Oil Farmers with Technology and Quality Products.
        </Typography>

        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mb: 4, bgcolor: 'white', color: 'text.primary' }}> {/* Paper background to white for readability */}
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: '#166534', mb: 2}}>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph>
                At PetanNaik, our mission is to revolutionize the palm oil farming industry in Indonesia by providing small-scale farmers with accessible, high-quality agricultural products and cutting-edge AI-driven consultation. We aim to enhance productivity, sustainability, and profitability for every farmer we serve.
              </Typography>
              <Typography variant="body1" paragraph>
                We believe that technology, combined with local expertise, can unlock immense potential. Our platform offers a comprehensive range of fertilizers, pesticides, and tools, alongside our intelligent PalmPilot assistant, designed to provide 24/7 expert guidance.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <Box
                component="img"
                src={petanNaikLogo} // You can use a different, more illustrative image here if you have one
                alt="PetanNaik Mission"
                sx={{ width: '80%', maxWidth: '350px', borderRadius: 2, boxShadow: 3 }}
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Added mb for spacing before footer */}
        <Grid container spacing={4} sx={{ mb: 6 }}> 
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', bgcolor: 'white', color: 'text.primary' }}> {/* Paper background to white */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <GroupIcon sx={{ fontSize: 40, color: '#22c55e', mr: 1 }} />
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', color: '#166534' }}>Our Team</Typography>
              </Box>
              <Typography variant="body1">
                PetanNaik is powered by SawitPRO, a dedicated team of agronomists, software engineers, and business professionals passionate about sustainable agriculture and farmer empowerment. We combine years of industry experience with innovative thinking to create solutions that make a real difference.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', bgcolor: 'white', color: 'text.primary' }}> {/* Paper background to white */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrackChangesIcon sx={{ fontSize: 40, color: '#eab308', mr: 1 }} />
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', color: '#166534' }}>Our Vision</Typography>
              </Box>
              <Typography variant="body1">
                We envision a future where every Indonesian palm oil farmer has the resources and knowledge to thrive. By bridging the gap between traditional farming practices and modern technology, we strive to contribute to a more prosperous and environmentally responsible agricultural sector.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        </Container> {/* Closes the Container maxWidth="lg" from line 132 */}
      </Box> {/* Closes the Box with lime green background from line 126 */}

      {/* Footer - Same as Home Page */}
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

export default AboutPage;