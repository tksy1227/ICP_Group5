import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { LanguageProvider } from './contexts/LanguageProvider';
import { CartProvider } from './contexts/CartContext'; // Import CartProvider
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import CartPage from './components/CartPage'; // Import CartPage
import UserProfilePage from './components/UserProfilePage'; // Import UserProfilePage
import AboutPage from './components/AboutPage'; // Import AboutPage
import ProductsPage from './components/ProductsPage'; // Import ProductsPage
import RecommendationsPage from './components/RecommendationsPage'; // Import RecommendationsPage
import ProductDetailPage from './components/ProductDetailPage'; // Import ProductDetailPage
import Layout from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <LanguageProvider>
          <CartProvider> {/* Wrap with CartProvider */}
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<Layout />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route path="/cart" element={<CartPage />} /> {/* Add CartPage route */}
                  <Route path="/profile" element={<UserProfilePage />} /> {/* Add UserProfilePage route */}
                  <Route path="/about" element={<AboutPage />} /> {/* Add AboutPage route */}
                  <Route path="/products" element={<ProductsPage />} /> {/* Add ProductsPage route */}
                  <Route path="/recommendations" element={<RecommendationsPage />} /> {/* Add RecommendationsPage route */}
                  <Route path="/products/:productId" element={<ProductDetailPage />} /> {/* Dynamic Product Detail Route */}
                </Route>
                <Route path="/" element={<Home />} />
              </Routes>
            </Router>
          </CartProvider>
        </LanguageProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;