import React, { useState, useMemo } from 'react';
import {
  Box, Button, Container, Grid, IconButton, Paper, Typography, Card, CardMedia, CardContent, CardActions, TextField, Select, InputLabel, FormControl, MenuItem // Added MenuItem import
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext'; // Removed unused imports: Divider
import { useProducts } from '../contexts/ProductContext'; // To get product list
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'; // Added import
import VisibilityIcon from '@mui/icons-material/Visibility'; 
import { useLanguage } from '../contexts/LanguageProvider'; // Removed unused imports: petanNaikLogo, usericon
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'; // Added import
import { useAuth } from '../contexts/AuthContext'; // Added missing useAuth import

const ProductsPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth(); // Keeping these for now, but they are unused.
  const { addToCart, cartItems, updateQuantity, parsePrice } = useCart();
  const { products } = useProducts();
  const { translations } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      let priceMatch = true;
      if (priceFilter) {
        const [min, max] = priceFilter.split('-').map(Number);
        if (priceFilter.startsWith('under-')) {
          priceMatch = product.price < max;
        } else if (priceFilter.startsWith('above-')) {
          priceMatch = product.price > min;
        } else { // Range
          priceMatch = product.price >= min && product.price <= max;
        }
      }
      // Add categoryMatch logic here when categories are implemented
      const categoryMatch = categoryFilter ? product.type?.toUpperCase() === categoryFilter : true;
      return nameMatch && priceMatch && categoryMatch;

    });
  }, [products, searchTerm, priceFilter, categoryFilter]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

const categories = useMemo(() => {
  const uniqueTypes = [...new Set(products.map(p => p.type?.toUpperCase()).filter(Boolean))];

  const typeLabelMap = {
   GOODS: translations.products.GOODS || 'Goods',
   SERVICE: translations.products.SERVICE || 'Service',
   DIGITAL: translations.products.DIGITAL || 'Digital',
  };


  return uniqueTypes.map(type => ({
    value: type, // used for filtering logic
    label: typeLabelMap[type] || type.charAt(0) + type.slice(1).toLowerCase(), // fallback display
  }));
}, [products, translations]);

  const priceRanges = [
    { value: '', label: translations.products.allPrices },
    { value: 'under-100000', label: `${translations.products.under} Rp 100.000` },
    { value: '100000-500000', label: 'Rp 100.000 - Rp 500.000' },
    { value: '500001-1000000', label: 'Rp 500.001 - Rp 1.000.000' },
    { value: 'above-1000000', label: `${translations.products.above} Rp 1.000.000` },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#FEFAE0' }}>
      {/* Products Content */}
      <Container sx={{ py: 4, flexGrow: 1 }} maxWidth="lg">
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: '#166534', textAlign: 'center', mb: 3 }}>
          {translations.products.pageTitle}
        </Typography>

        {/* Search and Filters */}
        <Paper elevation={2} sx={{ p: 2, mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            label={translations.products.searchPlaceholder}
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'action.active' }} /> }}
            sx={{ flexGrow: 1, minWidth: '200px' }}
          />
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>{translations.products.priceRange}</InputLabel>
            <Select value={priceFilter} label={translations.products.priceRange} onChange={(e) => setPriceFilter(e.target.value)}>
              {priceRanges.map(range => <MenuItem key={range.value} value={range.value}>{range.label}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>{translations.products.category}</InputLabel>
            <Select value={categoryFilter} label={translations.products.category} onChange={(e) => setCategoryFilter(e.target.value)}>
              <MenuItem value="">{translations.products.allCategories}</MenuItem>
              {categories.map(cat => <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>)}
            </Select>
          </FormControl>
          <Button variant="outlined" startIcon={<FilterListIcon />} sx={{borderColor: '#166534', color:'#166534'}}> {/* Use translations.products.applyFilters */}
            {translations.products.applyFilters}
          </Button>
        </Paper>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <Grid container spacing={3} justifyContent="center"> {/* Added justifyContent */}
            {filteredProducts.map((product) => {
              const cartItem = cartItems.find(item => item.product_id === product.product_id); // Assuming product_id from context
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={product.image} // Use actual product image
                      alt={product.name}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        sx={{
                          fontWeight: 'medium',
                          fontSize: '1.1rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2, // Show a maximum of 2 lines
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          minHeight: `calc(1.1rem * 1.6 * 2)`, // Reserve space for 2 lines (assuming default h6 line-height of 1.6)
                        }}>
                        {product.name}
                      </Typography>
                      <Typography variant="body1" color="#166534" sx={{ fontWeight: 'bold', mb: 1 }}>
                        {formatCurrency(product.price)}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}> {/* Ensure actions are at bottom and aligned */}
                      {/* Left part: Add to Cart button OR Quantity Controls */}
                      <Box sx={{ flexGrow: 1, mr: 1, display: 'flex', justifyContent: cartItem ? 'center' : 'flex-start' }}> {/* Container for the main action */}
                        {cartItem ? (
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={() => updateQuantity(product.product_id, cartItem.quantity - 1)} size="small" sx={{ color: '#166534' }}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                            <Typography sx={{ mx: 1.5, fontWeight: 'medium' }}>{cartItem.quantity}</Typography>
                            <IconButton onClick={() => updateQuantity(product.product_id, cartItem.quantity + 1)} size="small" sx={{ color: '#166534' }}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                          </Box>
                        ) : (
                          <Button
                            fullWidth // Make button take full width of its container
                            variant="contained"
                            startIcon={<ShoppingCartIcon />}
                            onClick={() => addToCart({ ...product, id: product.product_id, price: parsePrice(product.price)})} 
                            sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' } }}
                          > {/* Use translations.products.addToCart */}
                            {translations.products.addToCart}
                          </Button>
                        )}
                      </Box>

                      {/* Right part: View Icon Button - Always visible */}
                      <IconButton 
                        sx={{ 
                          bgcolor: '#f0fdf4', 
                          color: '#22c55e', 
                          '&:hover': { bgcolor: '#dcfce7' },
                          flexShrink: 0 // Prevent icon button from shrinking
                        }} 
                        onClick={() => {
                          navigate(`/products/${product.product_id}`);
                          localStorage.setItem('currentProduct', JSON.stringify(product));
                        }} 
                        aria-label="view product"> {/* Use translations.products.viewProduct */}
                          <VisibilityIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">{translations.common.noProductsFound}</Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
};
export default ProductsPage;