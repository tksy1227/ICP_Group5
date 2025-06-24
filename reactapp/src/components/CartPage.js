import React, { useState } from 'react';
import {
  Button, Container, Divider, Grid, IconButton, List, ListItem, ListItemText, Paper, Typography, CardMedia, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useLanguage } from '../contexts/LanguageProvider';

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    totalCartQuantity, 
    cartSubtotal, 
    cartTotal,
    parsePrice 
  } = useCart(); // Removed unused useAuth import
  const { translations } = useLanguage();

  // Checkout state
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const handleCheckout = () => {
    // In a real app, this would involve payment processing, order creation, etc.
    // For now, we'll just clear the cart and show a success message.
    clearCart();
    setCheckoutComplete(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  if (checkoutComplete) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', textAlign: 'center', p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#166534', fontWeight: 'bold' }}> {/* Use translations.common.thankYouForOrder */}
          {translations.common.thankYouForOrder}
        </Typography>
        <Typography variant="h6" gutterBottom> {/* Use translations.common.orderPlacedSuccessfully */}
          {translations.common.orderPlacedSuccessfully}
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 3, bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }}}>
          {translations.common.continueShopping}
        </Button>
      </Box>
    );
  }

  return (
    // The outer Box was missing its closing tag, causing the "Adjacent JSX elements" error.
    // The structure should be a single outermost element (the Box) containing all other JSX.
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#166534', textAlign: 'center', mb: 4 }}> {/* Use translations.common.cart */}
          {translations.common.cart}
        </Typography>

        {cartItems.length === 0 ? (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">{translations.common.yourCartIsEmpty}</Typography>
            <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2, bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }}}>
              {translations.common.continueShopping}
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items List */}
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <List>
                  {cartItems.map((item) => (
                    <React.Fragment key={item.id}>
                      <ListItem alignItems="flex-start" sx={{ py: 2 }}>
                        <CardMedia
                          component="img"
                          image={item.image}
                          alt={item.name}
                          sx={{ width: 100, height: 100, objectFit: 'cover', mr: 2, borderRadius: 1 }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" component="div">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">{formatCurrency(parsePrice(item.price))}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <IconButton onClick={() => updateQuantity(item.id, item.quantity - 1)} size="small" sx={{ color: '#166534' }}>
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                            <Typography sx={{ mx: 1.5, fontWeight: 'medium' }}>{item.quantity}</Typography>
                            <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)} size="small" sx={{ color: '#166534' }}>
                              <AddCircleOutlineIcon />
                            </IconButton>
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                           <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                            {formatCurrency(parsePrice(item.price) * item.quantity)} {/* Price is dynamic, no translation needed */}
                           </Typography>
                           <IconButton onClick={() => removeFromCart(item.id)} color="error" size="small" sx={{mt:1}}>
                             <DeleteIcon />
                           </IconButton>
                        </Box>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>

            {/* Order Summary - Receipt Style */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ 
                p: 3, 
                fontFamily: 'monospace', // For receipt feel
                border: '1px dashed #166534',
                bgcolor: '#f8f9fa'
              }}> {/* Use translations.common.orderSummary */}
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#166534', textAlign: 'center', fontFamily: 'inherit' }}> 
                  {translations.common.orderSummary}
                </Typography>
                <Divider sx={{ my: 2 }} />
                {cartItems.map(item => (
                    <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, fontSize: '0.9rem', fontFamily: 'inherit' }}>
                        <Typography variant="body2" sx={{fontFamily: 'inherit'}}>
                            {item.name} (x{item.quantity}) {/* Item name and quantity are dynamic */}
                        </Typography>
                        <Typography variant="body2" sx={{fontFamily: 'inherit'}}>{formatCurrency(parsePrice(item.price) * item.quantity)}</Typography>
                    </Box>
                ))}
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1, fontFamily: 'inherit' }}>
                  <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'inherit' }}>{translations.common.subtotal}</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 'medium', fontFamily: 'inherit' }}>{formatCurrency(cartSubtotal)}</Typography>
                </Box>
                {/* Placeholder for Shipping & Tax */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1, color: 'text.secondary', fontFamily: 'inherit' }}>
                  <Typography variant="body2" sx={{fontFamily: 'inherit'}}>{translations.common.shipping}</Typography>
                  <Typography variant="body2" sx={{fontFamily: 'inherit'}}>FREE</Typography> 
                </Box>
                 <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 1, color: 'text.secondary', fontFamily: 'inherit' }}>
                  <Typography variant="body2" sx={{fontFamily: 'inherit'}}>{translations.common.taxEst}</Typography>
                  <Typography variant="body2" sx={{fontFamily: 'inherit'}}>{formatCurrency(0)}</Typography> 
                </Box>
                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, fontFamily: 'inherit' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}>Total</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'inherit' }}>{formatCurrency(cartTotal)}</Typography>
                </Box>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleCheckout}
                  sx={{ mt: 3, py: 1.5, bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }, fontWeight: 'bold' }}
                >
                  {translations.common.proceedToCheckout}
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  ); 
};

export default CartPage;