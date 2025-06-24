import React from 'react';
import {
  Box, Button, Container, Divider, Grid, Paper, Typography, Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import EditIcon from '@mui/icons-material/Edit';
import { useLanguage } from '../contexts/LanguageProvider';
import usericon from '../images/usericon.png';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const { translations } = useLanguage();

  if (!isLoggedIn || !user) {
    navigate('/login');
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Profile Content */}
      <Container sx={{ py: 4, flexGrow: 1 }} maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#166534', textAlign: 'center', mb: 4 }}> {/* Use translations.profile.pageTitle */}
          {translations.profile.pageTitle}
        </Typography>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar
            src={usericon} // Later, this could be user.profileImageUrl or similar
            alt={user.name}
            sx={{ width: 100, height: 100, mb: 2, bgcolor: '#22c55e' }}
          >
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Avatar>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            {user.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {user.email}
          </Typography>
          
          <Divider sx={{ my: 3, width: '80%' }} />

          <Grid container spacing={2} sx={{ textAlign: 'left', width: '100%', maxWidth: '500px' }}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{translations.profile.fullName}:</Typography>
              <Typography variant="body1">{user.name}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{translations.profile.emailAddress}:</Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
            {/* Add more user details here as needed */}
            {/* Example:
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Member Since:</Typography>
              <Typography variant="body1">{new Date(user.createdAt).toLocaleDateString()}</Typography>
            </Grid>
            */}
          </Grid>

          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            sx={{ mt: 4, borderColor: '#166534', color: '#166534', '&:hover': { borderColor: '#14532d', bgcolor: 'rgba(22, 101, 52, 0.04)' } }}
            // onClick={() => navigate('/profile/edit')} // For a future edit page
          >
            {translations.common.editProfileComingSoon}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default UserProfilePage;