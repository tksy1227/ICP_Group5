import React from 'react'; // Removed unused useState
import {
  Box, Container, Divider, Grid, Paper, Typography, Avatar // Removed unused imports: Button, IconButton, List, ListItem, ListItemText, Menu, MenuItem, AppBar, Toolbar, Drawer
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import GroupIcon from '@mui/icons-material/Group';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { useLanguage } from '../contexts/LanguageProvider';

import petanNaikLogo from '../images/petannaik_logo.png';
const AboutPage = () => {
  // Removed unused imports: navigate, isLoggedIn, user, logout, useAuth, useCart
  const { translations } = useLanguage();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* About Us Content */}
      <Box sx={{ 
        bgcolor: '#FEFAE0', // Changed background color
        color: '#4D533D', // Default text color for this section
        py: 4, 
        flexGrow: 1 
      }}>
        <Container maxWidth="lg">
          {/* Adjusted text colors for visibility on green background */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#4D533D', textAlign: 'center', mb: 3 }}>
          {translations.about.pageTitle}
        </Typography>
        <Typography variant="h5" component="p" sx={{ textAlign: 'center', mb: 5, maxWidth: '800px', mx: 'auto', color: '#4D533D' }}>
          {translations.about.subtitle}
        </Typography>

        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mb: 4, bgcolor: 'white', color: 'text.primary' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: '#166534', mb: 2}}>
                {translations.about.ourMission}
              </Typography>
              <Typography variant="body1" paragraph>
                {translations.about.ourMissionBody1}
              </Typography>
              <Typography variant="body1" paragraph>
                {translations.about.ourMissionBody2}
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
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', color: '#166534' }}>{translations.about.ourTeam}</Typography>
              </Box>
              <Typography variant="body1">
                {translations.about.ourTeamBody}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', bgcolor: 'white', color: 'text.primary' }}> {/* Paper background to white */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrackChangesIcon sx={{ fontSize: 40, color: '#eab308', mr: 1 }} />
                <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold', color: '#166534' }}>{translations.about.ourVision}</Typography>
              </Box>
              <Typography variant="body1">
                {translations.about.ourVisionBody}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        </Container> {/* Closes the Container maxWidth="lg" from line 132 */}
      </Box> {/* Closes the Box with lime green background from line 126 */}

    </Box>
  );
};

export default AboutPage;