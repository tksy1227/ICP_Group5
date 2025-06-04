import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  InputBase,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const drawerWidth = 240;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'My Cart', icon: <ShoppingCartIcon /> },
    { text: 'AI Assistant', icon: <ChatIcon />, link: '/chatbot' },
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'Help Center', icon: <HelpIcon /> },
    { text: 'About Us', icon: <InfoIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#556B2F',
            color: 'white',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="div">
            PetanNaik
          </Typography>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text}
              onClick={() => item.link && navigate(item.link)}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 3 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search for items"
          />
          <IconButton type="submit" sx={{ p: '10px' }}>
            <SearchIcon />
          </IconButton>
        </Paper>

        <Typography variant="h4" gutterBottom>
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Get your latest update for the last 7 days
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Available Items */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              Available Items
            </Typography>
            <Grid container spacing={2}>
              {/* Sample Product Card */}
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/path-to-product-image.jpg"
                    alt="Product"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      SawitPRO Fertilizer
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rp 315,934.00
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" gutterBottom>
              Recent Activity
            </Typography>
            <Paper sx={{ p: 2 }}>
              {/* Add recent activity content here */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Home;