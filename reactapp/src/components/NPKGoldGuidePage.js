import React from 'react';
import {
  Box, Button, Container, Typography, Paper, CardMedia
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Placeholder image for NPK Gold Guide
const npkGoldImage = 'https://images.unsplash.com/photo-1635188557504-7cc236e3d0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

const NPKGoldGuidePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#FEFAE0' }}>
      {/* Main Content */}
      <Container sx={{ py: 4, flexGrow: 1 }} maxWidth="md">
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/recommendations')} sx={{ mb: 2, color: '#166534' }}>
          Back to Recommendations
        </Button>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#166534', mb: 3 }}>
            Boost Your Yield with NPK Gold
          </Typography>
          <CardMedia
            component="img"
            image={npkGoldImage}
            alt="NPK Gold Fertilizer"
            sx={{ width: '100%', maxHeight: 400, objectFit: 'cover', borderRadius: 2, mb: 3 }}
          />
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            Our top-rated NPK Gold fertilizer is showing excellent results for farmers in your region. This guide will walk you through the benefits, application methods, and optimal timing for using NPK Gold to maximize your palm oil yield.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            NPK Gold provides a balanced blend of Nitrogen (N), Phosphorus (P), and Potassium (K), essential macronutrients for healthy plant growth, strong root development, and abundant fruit production. Its unique formulation ensures quick absorption and sustained release, providing your palm trees with consistent nourishment.
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.7 }}>
            For best results, apply NPK Gold during the active growth phases of your palm trees, typically before flowering and during fruit development. Consult with our PalmPilot AI assistant for a tailored application schedule based on your specific soil conditions and tree age.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default NPKGoldGuidePage;