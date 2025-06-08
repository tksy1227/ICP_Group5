import React, { useState, useRef, useEffect } from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Paper, 
    TextField, 
    Button, 
    List, 
    ListItem, 
    Select, 
    MenuItem, 
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    ListItemText,
    Menu,
    Grid, // Added for Footer
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TranslateIcon from '@mui/icons-material/Translate';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; 
import MenuIcon from '@mui/icons-material/Menu'; // Changed from KeyboardArrowDownIcon
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Added import
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VerifiedIcon from '@mui/icons-material/Verified';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email'; // Added for Footer
import PhoneIcon from '@mui/icons-material/Phone'; // Added for Footer
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Added for Footer
import { useLanguage, languages } from '../contexts/LanguageProvider';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext'; // Import useCart
import { useNavigate } from 'react-router-dom';
import petanNaikLogo from '../images/petannaik_logo.png'; 
import usericon from '../images/usericon.png'; // Import user icon
import palmPilotLogo from '../images/palmpilot_logo.png'; // Import PalmPilot logo

const CHATBOT_API = "http://127.0.0.1:8000/api/v1/messaging/chatbot";
const USER_ID = "13f5223e-f04a-4fa8-9ef2-cf36060f0d6d";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { language, setLanguage, translations } = useLanguage(); // Make sure translations is used or remove if not
    const { isLoggedIn, user, logout } = useAuth(); // Add logout
    const { totalCartQuantity } = useCart(); // Get cart quantity
    const navigate = useNavigate();
    
    // Navigation menu state
    const [languageMenu, setLanguageMenu] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false); // Changed for consistency
    
    const handleLanguageClick = (event) => {
        setLanguageMenu(event.currentTarget);
    };

    // Profile Menu State and Handlers
    const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
    const openProfileMenu = Boolean(profileMenuAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setProfileMenuAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileMenuAnchorEl(null);
    };

    const handleLanguageClose = () => {
        setLanguageMenu(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/'); // Navigate to home page after logout
        handleProfileMenuClose();
    };

    const menuItems = [
        { text: 'Home', link: '/' },
        { text: 'Products', link: '/products' },
        { text: 'Recommendations', link: '/recommendations' },
        { text: 'Chatbot', link: '/chatbot' },
        { text: 'Profile', link: '/profile' },
        { text: 'About', link: '/about' },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        // Set the chatbot's language to English when the component mounts.
        setLanguage('en');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array ensures this runs only once on mount

    const clearChat = () => {
        setMessages([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
        setLoading(true);

        try {
            const response = await fetch(CHATBOT_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: USER_ID,
                    message: userMessage,
                    language: language
                })
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(prev => [...prev, { type: 'bot', text: data.message || 'Sorry, I encountered an error.' }]);
            } else {
                setMessages(prev => [...prev, { type: 'bot', text: 'Sorry, I encountered an error.' }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { type: 'bot', text: 'Connection error. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Drawer - Consistent with other pages */}
            <Drawer
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                sx={{
                    width: drawerOpen ? 240 : 0,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                        bgcolor: '#166534', 
                        color: 'white',
                        borderRight: 'none'
                    },
                }}
            >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>Menu</Typography>
                    <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} button onClick={() => { navigate(item.link); setDrawerOpen(false); }} sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' }}}>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* Header/Navigation - Same as Home page */}
            <AppBar position="static" sx={{ bgcolor: '#166534' }}>
                <Toolbar>
                    {/* Side Menu Button - MOVED TO THE LEFT */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={() => setDrawerOpen(!drawerOpen)}
                        sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        onClick={() => setDrawerOpen(!drawerOpen)}
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} >
                        <MenuIcon />
                    </IconButton>
                    {/* Logo */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 4 }}>
                        <Box 
                            component="img" 
                            src={petanNaikLogo} // Use imported logo
                            alt="PetanNaik Logo"
                            sx={{ height: 40, width: 70, mr: 1 }} // Consistent sizing
                        />
                        <Box>
                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                PetanNaik
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', lineHeight: 1 }}>
                                by SawitPRO
                            </Typography>
                        </Box>
                    </Box>
                    
                    {/* Navigation Menu */}
                    <Box sx={{ 
                        flexGrow: 1, 
                        display: { xs: 'none', md: 'flex' }, 
                        justifyContent: 'center' 
                    }}>
                        {menuItems.map((item) => (
                            <Button 
                                key={item.text}
                                color="inherit"
                                onClick={() => navigate(item.link)}
                                sx={{ mx: 1, fontWeight: 'medium' }}
                            >
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                    
                    {/* Right Side - Language, Login, Cart */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button 
                            color="inherit" 
                            onClick={handleLanguageClick}
                            endIcon={<KeyboardArrowDownIcon />}
                            sx={{ mr: 1 }}
                        >
                            English
                        </Button>
                        <Menu
                            anchorEl={languageMenu}
                            open={Boolean(languageMenu)}
                            onClose={handleLanguageClose}
                        >
                            <MenuItem onClick={handleLanguageClose}>English</MenuItem>
                            <MenuItem onClick={handleLanguageClose}>Bahasa Indonesia</MenuItem>
                        </Menu>
                        
                        {isLoggedIn ? (
                            <>
                                <IconButton 
                                    color="inherit" 
                                    sx={{ mr: 2 }}
                                    onClick={handleProfileMenuOpen}
                                >
                                    <Box 
                                        component="img" 
                                        src={usericon} // Use imported user icon
                                        alt="Profile"
                                        sx={{ width: 32, height: 32, borderRadius: '50%' }}
                                    />
                                </IconButton>
                                <Menu
                                    anchorEl={profileMenuAnchorEl}
                                    open={openProfileMenu}
                                    onClose={handleProfileMenuClose}
                                    onClick={handleProfileMenuClose}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>Profile</MenuItem>
                                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button 
                                variant="contained" 
                                onClick={() => navigate('/login')}
                                sx={{ 
                                    bgcolor: '#eab308', 
                                    color: 'black', 
                                    fontWeight: 'bold',
                                    '&:hover': { bgcolor: '#ca8a04' },
                                    mr: 2
                                }}
                            >
                                Login
                            </Button>
                        )}
                        
                        {isLoggedIn && (
                            <IconButton color="inherit" sx={{ mr: 1 }}>
                                <VerifiedIcon />
                            </IconButton>
                        )}
                        
                        <IconButton 
                            color="inherit" 
                            sx={{ position: 'relative' }}
                            onClick={() => navigate('/cart')} // Navigate to cart page
                        >
                            <ShoppingCartIcon />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    bgcolor: '#eab308',
                                    color: 'black',
                                    borderRadius: '50%',
                                    width: 18,
                                    height: 18,
                                    fontSize: 12,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    display: totalCartQuantity > 0 ? 'flex' : 'none', // Show badge if items in cart
                                }}
                            >
                                {totalCartQuantity}
                            </Box>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Hero Section for Chatbot */}
            <Box 
                sx={{ 
                    bgcolor: '#FEFAE0', 
                    color: '#4D533D',
                    py: 4,
                    textAlign: 'center'
                }}
            >
                <Container>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                        <Box
                            component="img"
                            src={palmPilotLogo} // Use imported PalmPilot logo
                            alt="PalmPilot Assistant Logo"
                            sx={{ height: { xs: 40, md: 100 }, width: { xs: 40, md: 500 }, mr: 1.5 }}
                        />
                    </Box>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Your Smart Palm Oil Farming Consultant - Available 24/7
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        Get expert advice on fertilizers, pest control, harvesting, and more!
                    </Typography>
                </Container>
            </Box>

            {/* Main Chat Container */}
            <Container maxWidth="lg" sx={{ flex: 1, py: 4, display: 'flex', flexDirection: 'column' }}>
                {/* Chat Controls */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Select
                            value={language}
                            onChange={handleLanguageChange}
                            size="small"
                            sx={{ 
                                bgcolor: 'white',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#22c55e',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#16a34a',
                                },
                            }}
                        >
                            {Object.entries(languages).map(([code, lang]) => (
                                <MenuItem key={code} value={code}>
                                    {lang.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Button
                            startIcon={<DeleteIcon />}
                            onClick={clearChat}
                            variant="outlined"
                            sx={{ 
                                borderColor: '#ef4444', 
                                color: '#ef4444',
                                '&:hover': { 
                                    borderColor: '#dc2626', 
                                    bgcolor: '#fef2f2' 
                                }
                            }}
                        >
                            Clear Chat
                        </Button>
                    </Box>
                    
                    <Button
                        startIcon={<HomeIcon />}
                        onClick={() => navigate('/')}
                        variant="outlined"
                        sx={{ 
                            borderColor: '#22c55e', 
                            color: '#22c55e',
                            '&:hover': { 
                                borderColor: '#16a34a', 
                                bgcolor: '#f0fdf4' 
                            }
                        }}
                    >
                        Back to Home
                    </Button>
                </Box>

                {/* Chat Messages Area */}
                <Paper 
                    elevation={3} 
                    sx={{ 
                        flex: 1, 
                        mb: 3, 
                        p: 3, 
                        overflow: 'auto',
                        bgcolor: '#f8fafc',
                        border: '2px solid #e2e8f0',
                        borderRadius: 2,
                        minHeight: '60vh'
                    }}
                >
                    {messages.length === 0 ? (
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            height: '100%',
                            textAlign: 'center',
                            color: '#64748b'
                        }}>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                                👋 Welcome to PalmPilot!
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, maxWidth: 600 }}>
                                I'm here to help you with all your palm oil farming questions. 
                                Ask me about fertilizers, pest control, harvesting techniques, or any farming challenges you're facing!
                            </Typography>
                            <Box sx={{ 
                                display: 'flex', 
                                flexWrap: 'wrap', 
                                gap: 1, 
                                justifyContent: 'center',
                                maxWidth: 600
                            }}>
                                {[
                                    "What fertilizer should I use?",
                                    "How to control caterpillar pests?",
                                    "When is the best time to harvest?",
                                    "How to improve palm oil yield?"
                                ].map((suggestion, index) => (
                                    <Button
                                        key={index}
                                        variant="outlined"
                                        size="small"
                                        onClick={() => setInput(suggestion)}
                                        sx={{
                                            borderColor: '#22c55e',
                                            color: '#22c55e',
                                            '&:hover': {
                                                borderColor: '#16a34a',
                                                bgcolor: '#f0fdf4'
                                            }
                                        }}
                                    >
                                        {suggestion}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    ) : (
                        <List>
                            {messages.map((message, index) => (
                                <ListItem key={index} sx={{
                                    display: 'flex',
                                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                                    p: 1
                                }}>
                                    <Paper 
                                        sx={{
                                            p: 2,
                                            maxWidth: '70%',
                                            bgcolor: message.type === 'user' ? '#e3f2fd' : '#fff'
                                        }}
                                    >
                                        <Typography>
                                            {message.type === 'user' ? '🧑‍💻 ' : '🤖 '}
                                            {message.text}
                                        </Typography>
                                    </Paper>
                                </ListItem>
                            ))}
                            {loading && (
                                <ListItem sx={{ justifyContent: 'flex-start', p: 1 }}>
                                    <Paper sx={{ p: 2, bgcolor: '#fff' }}>
                                        <Typography>🤖 {translations.chatbot.thinking}...</Typography>
                                    </Paper>
                                </ListItem>
                            )}
                            <div ref={messagesEndRef} />
                        </List>
                    )}
                </Paper>

                {/* Chat Input */}
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
                    <TextField
                        fullWidth
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={translations.chatbot.placeholder}
                        disabled={loading}
                        sx={{
                            bgcolor: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#22c55e',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#16a34a',
                            },
                        }}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        endIcon={<SendIcon />}
                        disabled={loading || !input.trim()}
                        sx={{
                            bgcolor: '#22c55e',
                            color: '#fff',
                            '&:hover': {
                                bgcolor: '#16a34a'
                            }
                        }}
                    >
                        {translations.chatbot.send}
                    </Button>
                </Box>
            </Container>
            {/* Footer - Same as Home Page */}
            <Box sx={{ bgcolor: '#1e293b', color: 'white', py: 6, mt: 'auto' }}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={3}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Box component="img" src={petanNaikLogo} alt="PetanNaik Logo" sx={{ height: 40, width: 70, mr: 1 }} />
                                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>PetanNaik</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ mb: 2 }}>Trusted e-commerce platform for small-scale palm oil farmers in Indonesia.</Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Products</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>Fertilizers & Nutrition</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>Pesticides</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>Farming Tools</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>Premium Seeds</Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Services</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>PalmPilot Consultation</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>AI Recommendations</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>Farming Guides</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>Technical Support</Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Contact</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><EmailIcon sx={{ mr: 1, fontSize: 18 }} /><Typography variant="body2">info@petannaik.com</Typography></Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><PhoneIcon sx={{ mr: 1, fontSize: 18 }} /><Typography variant="body2">+62 21 1234 5678</Typography></Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><LocationOnIcon sx={{ mr: 1, fontSize: 18 }} /><Typography variant="body2">Jakarta, Indonesia</Typography></Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 2, textAlign: 'center' }}>
                        <Typography variant="body2">© {new Date().getFullYear()} PetanNaik by SawitPRO. All rights reserved.</Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default Chatbot;