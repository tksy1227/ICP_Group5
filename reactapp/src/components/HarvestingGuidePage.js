import React from 'react'; // Removed unused useState
import {
  Box, Button, Container, Grid, Paper, Typography, CardMedia // Removed unused imports: AppBar, Drawer, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Toolbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLanguage } from '../contexts/LanguageProvider'; // Added missing import

// Placeholder image for Harvesting Guide
const harvestingImage = 'https://images.unsplash.com/photo-1598887142487-3c854d51d2c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

const HarvestingGuidePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const { translations } = useLanguage(); // Removed unused user, logout, totalCartQuantity

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#FEFAE0' }}>
      {/* Main Content */}
      <Container sx={{ py: 4, flexGrow: 1 }} maxWidth="md">
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/recommendations')} sx={{ mb: 2, color: '#166534' }}>
          Back to Recommendations
        </Button>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#166534', mb: 3 }}>
            Optimal Harvesting Guide
          </Typography>
          <CardMedia
            component="img"
            image={harvestingImage}
            alt="Palm Oil Harvesting"
            sx={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 2, mb: 3 }}
          />
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            Maximizing your oil extraction rates begins with understanding the optimal harvesting times and techniques. This guide provides essential insights to ensure you get the most out of your palm oil yield.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            The ideal time to harvest oil palm fresh fruit bunches (FFB) is when a certain number of loose fruits have fallen naturally from the bunch. This indicates optimal ripeness, leading to higher oil content and quality. Harvesting too early results in low oil content, while harvesting too late can lead to oil degradation and loss.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            Proper harvesting tools and techniques are crucial to minimize damage to the fruit bunches and the palm tree itself. Ensure your harvesting tools are sharp and clean to make precise cuts. Train your harvesters on the correct methods to avoid bruising the fruit, which can negatively impact oil quality.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            Regular and systematic harvesting rounds are also vital. This ensures that ripe bunches are collected promptly, preventing over-ripening and maintaining a consistent supply of quality FFB.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default HarvestingGuidePage;