import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import petanNaikLogo from '../images/petannaik_logo.png';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: '#1e293b', color: 'white', py: 6, mt: 'auto' }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box component="img" src={petanNaikLogo} alt="PetanNaik Logo" sx={{ height: 40, width: 70, mr: 1 }} />
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
            <Link href="/products" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>Fertilizers & Nutrition</Link>
            <Link href="/products" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>Pesticides</Link>
            <Link href="/products" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>Farming Tools</Link>
            <Link href="/products" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>Premium Seeds</Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Services
            </Typography>
            <Link href="/chatbot" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>PalmPilot Consultation</Link>
            <Link href="/recommendations" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>AI Recommendations</Link>
            <Link href="/recommendations" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>Farming Guides</Link>
            <Typography variant="body2" sx={{ mb: 1, cursor: 'pointer' }}>Technical Support</Typography>
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
            © {new Date().getFullYear()} PetanNaik by SawitPRO. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;