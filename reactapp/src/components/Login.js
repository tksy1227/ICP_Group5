import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  AppBar,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Alert,
  Toolbar,
} from '@mui/material';
import { Turnstile } from '@marsidev/react-turnstile'; // Correct import
// Import logo
import petanNaikLogo from '../images/petannaik_logo.png';

const INITIAL_TURNSTILE_KEY = Date.now(); // For forcing Turnstile re-render

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    turnstileToken: '', // Add state for Turnstile token
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // For disabling button
  const [turnstileKey, setTurnstileKey] = useState(INITIAL_TURNSTILE_KEY); // Key to reset Turnstile

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTurnstileVerify = (token) => {
    setFormData(prev => ({ ...prev, turnstileToken: token }));
    setError(''); // Clear previous CAPTCHA errors if user re-verifies
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!formData.turnstileToken) {
      setError('Please complete the CAPTCHA verification.');
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          turnstileToken: formData.turnstileToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user); // data.user should contain { id, name, email } from backend
        navigate('/');
      } else {
        const errorMessage = data.message || 'Login failed. Please try again.';
        setError(errorMessage);
        // If the error is related to Turnstile (e.g., timeout-or-duplicate), reset it
        if (data.errors && (data.errors.includes('timeout-or-duplicate') || data.errors.includes('invalid-input-response'))) {
          setFormData(prev => ({ ...prev, turnstileToken: '' })); // Clear the token
          setTurnstileKey(Date.now()); // Change key to force re-render of Turnstile
          setError('CAPTCHA verification issue. Please complete the verification again.');
        }
      }
    } catch (networkError) {
      console.error('Login API call failed:', networkError);
      setError('Could not connect to the server. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  // Function to manually reset Turnstile if needed (optional, requires library support for window.turnstile.reset())
  // const resetTurnstile = () => {
  //   if (window.turnstile && typeof window.turnstile.reset === 'function') {
  //       window.turnstile.reset();
  //   }
  // };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header/Navigation */}
      <AppBar position="static" sx={{ bgcolor: '#166534' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
            <Box 
              component="img" 
              src={petanNaikLogo} // Use imported logo
              alt="PetanNaik Logo"
              sx={{ height: 40, width: 70, mr: 1 }}
            />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              PetanNaik
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xs" sx={{ flexGrow: 1 }}>
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Paper elevation={3} sx={{ 
            padding: 4, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%',
            border: '2px solid #166534'
          }}>
            <Typography component="h1" variant="h5" sx={{ color: '#166534', fontWeight: 'bold' }}>
              Welcome to PetanNaik
            </Typography>
            {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
              />
              <Box sx={{ mt: 2, mb: 1, display: 'flex', justifyContent: 'center' }}>
                <Turnstile
                  siteKey={process.env.REACT_APP_TURNSTILE_SITE_KEY} // Use environment variable
                  key={turnstileKey} // Add key for re-rendering
                  onSuccess={handleTurnstileVerify}
                  // onError, onExpire can also be handled
                  // theme="light" or "dark" or "auto"
                  options={{
                    mode: 'managed', // Explicitly set mode to 'managed' for a visible challenge like a slider
                  }}
                />
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#166534', '&:hover': { bgcolor: '#14532d' } }}
                disabled={isSubmitting} // Disable button when submitting
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/register" style={{ textDecoration: 'none' }}>
                    <Typography variant="body2" color="primary">
                      Don't have an account? Sign Up
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
  export default Login;
