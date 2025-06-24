import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useLanguage, languages } from '../contexts/LanguageProvider';
import petanNaikLogo from '../images/petannaik_logo.png';
import usericon from '../images/usericon.png';

const Header = ({
  isLoggedIn,
  logout,
  totalCartQuantity,
  setDrawerOpen,
  profileMenuAnchorEl,
  setProfileMenuAnchorEl,
  languageMenu,
  setLanguageMenu,
}) => {
  const navigate = useNavigate();
  const { language, setLanguage, getMenuItems, translations } = useLanguage();
  const menuItems = getMenuItems();
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
  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode);
    handleLanguageClose();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#166534' }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setDrawerOpen(true)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 4, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Box component="img" src={petanNaikLogo} alt="PetanNaik Logo" sx={{ height: 40, width: 70, mr: 1 }} />
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              PetanNaik
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', lineHeight: 1 }}>
              by SawitPRO
            </Typography>
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
          <Button color="inherit" onClick={handleLanguageClick} sx={{ mr: 1 }}>
            {languages[language]?.name || 'Language'}
          </Button>
          <Menu anchorEl={languageMenu} open={Boolean(languageMenu)} onClose={handleLanguageClose}>
            {Object.values(languages).map((lang) => (
              <MenuItem key={lang.code} onClick={() => handleLanguageSelect(lang.code)}>
                {lang.name}
              </MenuItem>
            ))}
          </Menu>
          {isLoggedIn ? (
            <>
              <IconButton color="inherit" sx={{ mr: 2 }} onClick={handleProfileMenuOpen}>
                <Box component="img" src={usericon} alt="Profile" sx={{ width: 32, height: 32, borderRadius: '50%' }} />
              </IconButton>
              <Menu
                anchorEl={profileMenuAnchorEl}
                open={openProfileMenu}
                onClose={handleProfileMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>{translations.common.profile}</MenuItem>
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
  );
};

export default Header;