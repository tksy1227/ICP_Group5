import React from 'react'; // Removed unused useState
import {
  Box, Button, Container, Grid, Paper, Typography, CardMedia // Removed unused imports: AppBar, Drawer, IconButton, List, ListItem, ListItemText, Menu, MenuItem, Toolbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLanguage } from '../contexts/LanguageProvider'; // Added missing import

// Placeholder image for Leaf Spot Guide
const leafSpotImage = 'https://images.unsplash.com/photo-1620453325704-70e446e3c4c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

const LeafSpotGuidePage = () => {
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
            Combat Leaf Spot Effectively
          </Typography>
          <CardMedia
            component="img"
            image={leafSpotImage}
            alt="Leaf Spot Disease"
            sx={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 2, mb: 3 }}
          />
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            Leaf spot disease can significantly impact the health and productivity of your palm oil trees. This guide provides comprehensive information on identifying, preventing, and effectively treating leaf spot using our new systemic fungicide.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            Early detection is key. Look for small, dark spots on leaves that may enlarge and merge, often surrounded by a yellow halo. Severe infections can lead to defoliation and reduced photosynthesis, impacting yield.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            Our systemic fungicide offers long-lasting protection by being absorbed into the plant's tissues, providing internal defense against fungal pathogens. For optimal results, apply the fungicide preventatively during periods of high humidity or when conditions are favorable for disease development. Ensure proper coverage and follow dosage instructions carefully.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            Additionally, good cultural practices such as proper spacing, adequate drainage, and removal of infected plant debris can help minimize the spread of leaf spot.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default LeafSpotGuidePage;