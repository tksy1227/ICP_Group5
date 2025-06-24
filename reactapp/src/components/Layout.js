import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Box, IconButton, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Corrected import
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageProvider';

export default function Layout() {
  const { isLoggedIn, user, logout } = useAuth();
  const { totalCartQuantity } = useCart();
  const { getMenuItems, translations } = useLanguage();
  const navigate = useNavigate();

  const [languageMenu, setLanguageMenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const openProfileMenu = Boolean(profileMenuAnchorEl); // This line was duplicated, keeping one.

  const menuItems = getMenuItems();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#FEFAE0' }}>
      <Drawer variant="persistent" anchor="left" open={drawerOpen} sx={{ width: drawerOpen ? 240 : 0, flexShrink: 0, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box', bgcolor: '#166534', color: 'white', borderRight: 'none' } }}>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>{translations.common.menu}</Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}><ChevronLeftIcon /></IconButton>
        </Box>
        <List>{menuItems.map((item) => (<ListItem key={item.text} button onClick={() => { navigate(item.link); setDrawerOpen(false); }} sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' } }}><ListItemText primary={item.text} /></ListItem>))}</List>
      </Drawer>
      <Header isLoggedIn={isLoggedIn} user={user} logout={logout} totalCartQuantity={totalCartQuantity}
        drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}
        profileMenuAnchorEl={profileMenuAnchorEl} setProfileMenuAnchorEl={setProfileMenuAnchorEl} openProfileMenu={openProfileMenu}
        languageMenu={languageMenu} setLanguageMenu={setLanguageMenu} />
      <Outlet />
      <Footer />
    </Box>
  );
}