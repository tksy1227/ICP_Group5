import React, { useState, useEffect } from 'react';
import {
  Box, Button, Container, Grid, IconButton, Paper, Typography, Rating, CardMedia, Card, CardContent, CardActions, Divider // Removed unused imports: AppBar, Drawer, List, ListItem, ListItemText, Menu, MenuItem, Toolbar
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLanguage } from '../contexts/LanguageProvider'; // Added missing import

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { cartItems, addToCart, updateQuantity, parsePrice } = useCart();
  const { isLoggedIn } = useAuth();
  const { getProductById, products: allProducts } = useProducts(); // Get allProducts
  const { translations } = useLanguage();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [frequentlyBought, setFrequentlyBought] = useState([]);

  useEffect(() => {
    const foundProduct = getProductById(productId);
    if (foundProduct) {
      // Simulate fetching richer details if they were separate
      setProduct({
        ...foundProduct,
        // image: `https://via.placeholder.com/600x400/22c55e/ffffff?text=${encodeURIComponent(foundProduct.name.substring(0,20))}`, // Keep original image from context
        // Use description and rating from ProductContext if available, otherwise fallback
        description: foundProduct.description || `Detailed description for ${foundProduct.name}. This product is known for its quality and effectiveness in palm oil farming.`,
        rating: foundProduct.rating || 4.5, // Default rating
        reviews: foundProduct.reviews || Math.floor(Math.random() * 100) + 5, // Random review count
      });

      // Logic for frequently bought together
      const otherProducts = allProducts
        .filter(p => p.product_id !== productId)
        .sort(() => 0.5 - Math.random()) // Shuffle for variety
        .slice(0, 3); // Take up to 3 other products

      setFrequentlyBought(otherProducts.map(p => ({
        ...p,
        // image: `https://via.placeholder.com/300x200/22c55e/ffffff?text=${encodeURIComponent(p.name.substring(0,15))}`, // Keep original image from context
        rating: p.rating || (Math.random() * (5 - 3.5) + 3.5).toFixed(1), // Random rating
      })));
    }
    setLoading(false);
  }, [productId, getProductById, allProducts]);

  const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Typography>Loading product details...</Typography></Box>;
  }

  if (!product) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Typography>Product not found.</Typography></Box>;
  }

  const cartItem = cartItems.find(item => item.id === product.product_id || item.id === product.id); // Check both possible id fields
  const currentProductPrice = typeof product.price === 'string' ? parsePrice(product.price) : product.price;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#FEFAE0' }}>
      {/* Product Detail Content */}
      <Container sx={{ py: 4, flexGrow: 1 }} maxWidth="lg">
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2, color: '#166534' }}>
          {translations.common.backToProducts}
        </Button>
        <Paper elevation={3} sx={{ p: { xs: 2, md: 4 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                sx={{ width: '100%', maxHeight: 500, objectFit: 'contain', borderRadius: 2, border: '1px solid #eee' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#166534' }}>
                {product.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating name="read-only" value={product.rating} precision={0.1} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({product.reviews} {translations.productDetail.reviews})
                </Typography>
              </Box>
              <Typography variant="h5" sx={{ color: '#22c55e', fontWeight: 'bold', mb: 2 }}>
                {formatCurrency(currentProductPrice)}
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.7 }}>
                {product.description}
              </Typography>
              
              {cartItem ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <IconButton onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)} size="small" sx={{ color: '#166534', border: '1px solid #ddd' }}><RemoveCircleOutlineIcon /></IconButton>
                  <Typography sx={{ mx: 1, fontWeight: 'bold', fontSize: '1.2rem' }}>{cartItem.quantity}</Typography>
                  <IconButton onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)} size="small" sx={{ color: '#166534', border: '1px solid #ddd' }}><AddCircleOutlineIcon /></IconButton>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => addToCart({ ...product, id: product.product_id, price: currentProductPrice })} // Ensure correct id and numeric price
                  sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }, py: 1.5, px: 4, fontSize: '1rem', mb: 2 }}
                >
                  {translations.productDetail.addToCart}
                </Button>
              )}
              {/* Placeholder for more details like specifications, brand, etc. */}
              <Typography variant="caption" display="block" sx={{mt: 2, color: 'text.disabled'}}>{translations.productDetail.productId}: {product.product_id}</Typography>
              
{/* ADD THE HARDCODED RECOMMENDATIONS HERE - RIGHT AFTER THE PRODUCT ID LINE */}
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#166534', mb: 3 }}>
                  Frequently Bought Together
                </Typography>
                <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                  {/* Product 1: Garlon 670 EC - 100ml */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 380 }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={allProducts.find(p => p.product_id === 'garlon-670ec-100ml')?.image || 'https://via.placeholder.com/300x200/22c55e/ffffff?text=Garlon+670+EC+100ml'}
                        alt="Garlon 670 EC - 100ml"
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 'medium', minHeight: '3.2em', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          Garlon 670 EC - 100ml
                        </Typography>
                        <Typography variant="body1" color="#166534" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {formatCurrency(49350)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating name="rating-garlon-100ml" value={4.7} precision={0.1} readOnly size="small" />
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0, mt: 'auto' }}>
                        <Button 
                          fullWidth 
                          variant="contained" 
                          startIcon={<ShoppingCartIcon />} 
                          onClick={() => navigate('/products/garlon-670ec-100ml')}
                          sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' } }}
                        >
                          {translations.productDetail.viewProduct}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  {/* Product 2: Bomb Up 520 SL - 20 Liters */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 380 }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={allProducts.find(p => p.product_id === 'bombup-520sl-20l')?.image || 'https://via.placeholder.com/300x200/22c55e/ffffff?text=Bomb+Up+520+SL'}
                        alt="Bomb Up 520 SL - 20 Liters"
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 'medium', minHeight: '3.2em', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          Bomb Up 520 SL - 20 Liters
                        </Typography>
                        <Typography variant="body1" color="#166534" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {formatCurrency(1021558)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating name="rating-bombup" value={4.5} precision={0.1} readOnly size="small" />
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0, mt: 'auto' }}>
                        <Button 
                          fullWidth 
                          variant="contained" 
                          startIcon={<ShoppingCartIcon />} 
                          onClick={() => navigate('/products/bombup-520sl-20l')}
                          sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' } }}
                        >
                          {translations.productDetail.viewProduct}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>

                  {/* Product 3: Furadan 3GR 2Kg */}
                  <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 380 }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={allProducts.find(p => p.product_id === 'furadan-3gr-2kg')?.image || 'https://via.placeholder.com/300x200/22c55e/ffffff?text=Furadan+3GR+2Kg'}
                        alt="Furadan 3GR 2Kg"
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 'medium', minHeight: '3.2em', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          Furadan 3GR 2Kg
                        </Typography>
                        <Typography variant="body1" color="#166534" sx={{ fontWeight: 'bold', mb: 1 }}>
                          {formatCurrency(54503)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Rating name="rating-furadan" value={4.6} precision={0.1} readOnly size="small" />
                        </Box>
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0, mt: 'auto' }}>
                        <Button 
                          fullWidth 
                          variant="contained" 
                          startIcon={<ShoppingCartIcon />} 
                          onClick={() => navigate('/products/furadan-3gr-2kg')}
                          sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' } }}
                        >
                          {translations.productDetail.viewProduct}
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              {/* Frequently Bought Together Section - MOVED HERE */}
              {frequentlyBought.length > 0 && (
                <Box sx={{ mt: 4 }}> {/* Use translations.productDetail.frequentlyBoughtTogether */}
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#166534', mb: 3 }}>
                    Frequently Bought Together
                  </Typography>
                  <Grid container spacing={3} justifyContent="center" alignItems="stretch"> {/* Explicitly set alignItems */}
                    {frequentlyBought.map((freqProduct) => {
                      const freqCartItem = cartItems.find(item => item.id === freqProduct.product_id);
                      const freqProductPrice = typeof freqProduct.price === 'string' ? parsePrice(freqProduct.price) : freqProduct.price;

                      return (
                        <Grid item xs={12} sm={6} md={4} key={freqProduct.product_id}> {/* Adjusted md breakpoint for better fit if needed */}
                          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', minHeight: 380 /* Adjusted minHeight slightly */ }}>
                            <CardMedia // Image
                              component="img"
                              height="180" // Adjusted height for consistency
                              image={freqProduct.image}
                              alt={freqProduct.name}
                              sx={{ objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                              <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '1rem', fontWeight: 'medium', minHeight: '3.2em', /* approx 2 lines for 1rem font with 1.6 line-height */ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                {freqProduct.name}
                              </Typography>
                              <Typography variant="body1" color="#166534" sx={{ fontWeight: 'bold', mb: 1 }}>
                                {formatCurrency(freqProductPrice)}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Rating name={`rating-${freqProduct.product_id}`} value={parseFloat(freqProduct.rating)} precision={0.1} readOnly size="small" />
                              </Box>
                            </CardContent>
                            <CardActions sx={{ p: 2, pt: 0, mt: 'auto' /* Push actions to bottom */ }}>
                              {freqCartItem ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                  <IconButton onClick={() => updateQuantity(freqProduct.product_id, freqCartItem.quantity - 1)} size="small" sx={{ color: '#166534' }}><RemoveCircleOutlineIcon /></IconButton>
                                  <Typography sx={{ mx: 1.5, fontWeight: 'medium' }}>{freqCartItem.quantity}</Typography>
                                  <IconButton onClick={() => updateQuantity(freqProduct.product_id, freqCartItem.quantity + 1)} size="small" sx={{ color: '#166534' }}><AddCircleOutlineIcon /></IconButton>
                                </Box>
                              ) : ( // Use translations.productDetail.addToCart
                                <Button fullWidth variant="contained" startIcon={<ShoppingCartIcon />} onClick={() => addToCart({ ...freqProduct, id: freqProduct.product_id, price: freqProductPrice })} sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }}}>
                                  {translations.productDetail.addToCart}
                                </Button>
                              )}
                            </CardActions>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>

    </Box>
  );
};

export default ProductDetailPage;