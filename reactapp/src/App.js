import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Chatbot from './components/Chatbot';
import Layout from './components/Layout';

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <LanguageProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/chatbot" element={<Chatbot />} />
              </Route>
              <Route path="/" element={<Login />} />
            </Routes>
          </Router>
        </LanguageProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
