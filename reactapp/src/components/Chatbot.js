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
    ListSubheader, // Added for chat history sections
    Divider, // Added for separating sections in drawer
    Chip, // Added for displaying selected file
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
import AttachFileIcon from '@mui/icons-material/AttachFile'; // For file uploads
import MicIcon from '@mui/icons-material/Mic'; // For voice messages
import { useLanguage, languages } from '../contexts/LanguageProvider';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext'; // Import useCart
import { useNavigate } from 'react-router-dom';
import petanNaikLogo from '../images/petannaik_logo.png'; 
import usericon from '../images/usericon.png'; // Import user icon
import palmPilotLogo from '../images/palmpilot_logo.png'; // Import PalmPilot logo
import { v4 as uuidv4 } from 'uuid'; // For unique chat session IDs

const CHATBOT_API = "http://127.0.0.1:8000/api/v1/messaging/chatbot";
const USER_ID = "13f5223e-f04a-4fa8-9ef2-cf36060f0d6d";

const CHAT_SESSIONS_KEY = 'petanNaikChatSessions';
const ACTIVE_CHAT_ID_KEY = 'petanNaikActiveChatId';
const drawerWidth = 240; // Define drawer width for consistent use

const Chatbot = () => {
    // const [messages, setMessages] = useState([]); // Replaced by chatSessions
    const [chatSessions, setChatSessions] = useState([]);
    const [activeChatSessionId, setActiveChatSessionId] = useState(null);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null); // State for the selected file
    const fileInputRef = useRef(null); // Ref for the file input
    const messagesEndRef = useRef(null);
    const { language, setLanguage, translations } = useLanguage();
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

    // Derived state for messages to display - MOVED UP
    const currentMessages = chatSessions.find(session => session.id === activeChatSessionId)?.messages || [];

    useEffect(() => {
        scrollToBottom();
    }, [currentMessages]); // Changed from messages to currentMessages

    const handleNewChat = () => {
        const newId = uuidv4();
        const newSessionName = `Chat ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        const newSession = { id: newId, name: newSessionName, messages: [] };
        setChatSessions(prev => [newSession, ...prev]); // Add to the beginning
        setActiveChatSessionId(newId);
        // setDrawerOpen(false); // Optionally close drawer
    };

    useEffect(() => {
        const savedSessions = JSON.parse(localStorage.getItem(CHAT_SESSIONS_KEY) || '[]');
        const savedActiveId = localStorage.getItem(ACTIVE_CHAT_ID_KEY);

        if (savedSessions.length > 0) {
            setChatSessions(savedSessions);
            if (savedActiveId && savedSessions.some(s => s.id === savedActiveId)) {
                setActiveChatSessionId(savedActiveId);
            } else {
                setActiveChatSessionId(savedSessions[0].id); // Default to the first session
            }
        } else {
            handleNewChat(); // Create a new chat if no sessions are found
        }
        setLanguage('en');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Mount effect

    useEffect(() => {
        localStorage.setItem(CHAT_SESSIONS_KEY, JSON.stringify(chatSessions));
        if (activeChatSessionId) {
            localStorage.setItem(ACTIVE_CHAT_ID_KEY, activeChatSessionId);
        }
    }, [chatSessions, activeChatSessionId]);


    const handleSelectChat = (sessionId) => {
        setActiveChatSessionId(sessionId);
        // setDrawerOpen(false); // Optionally close drawer
    };

    const handleDeleteChat = (sessionId, event) => {
        event.stopPropagation(); // Prevent ListItem click
        setChatSessions(prev => prev.filter(session => session.id !== sessionId));
        if (activeChatSessionId === sessionId) {
            const remainingSessions = chatSessions.filter(session => session.id !== sessionId);
            if (remainingSessions.length > 0) {
                setActiveChatSessionId(remainingSessions[0].id);
            } else {
                handleNewChat(); // Create a new one if all are deleted
            }
        }
    };

    const clearChat = () => {
        if (!activeChatSessionId) return;
        setChatSessions(prevSessions =>
            prevSessions.map(session =>
                session.id === activeChatSessionId
                    ? { ...session, messages: [] }
                    : session
            ),
        setSelectedFile(null) // Clear selected file as well
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() && !selectedFile) return; // Allow sending if only a file is selected

        let currentSessionId = activeChatSessionId;
        let isNewSessionJustCreated = false;

        // Ensure there's an active session, create if not (e.g., if all were deleted)
        if (!currentSessionId || !chatSessions.find(s => s.id === currentSessionId)) {
            const newId = uuidv4();
            const newSessionName = `New Chat ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
            const newSession = { id: newId, name: newSessionName, messages: [] };
            // This direct state update before API call might be tricky with async nature.
            // It's better to ensure handleNewChat is called if activeChatSessionId is null.
            // For simplicity, let's assume initialization always provides an active session.
            // If activeChatSessionId can become null after deletions, this needs robust handling.
            // The current handleDeleteChat logic tries to set a new active or create one.
            
            // Fallback if somehow no active session (should be rare with current logic)
            if (!activeChatSessionId) {
                 console.warn("No active chat session, creating a new one.");
                 handleNewChat(); // This will set activeChatSessionId
                 // Since handleNewChat is async setState, currentSessionId might not be updated yet for this submit.
                 // This part needs careful review if activeChatSessionId can truly be null here.
                 // For now, we'll rely on the initialization and delete logic to maintain an active ID.
                 currentSessionId = chatSessions.length > 0 ? chatSessions[0].id : uuidv4(); // A bit of a guess if handleNewChat hasn't updated state yet.
            } else {
                currentSessionId = activeChatSessionId;
            }
        }

        const userMessage = input;
        setInput('');
        
        if (selectedFile) {
            // In a real app, you'd handle the file upload here.
            console.log('File to be sent with message:', selectedFile.name);
            // For now, we'll just log it and clear it after message processing.
        }

        setChatSessions(prevSessions =>
            prevSessions.map(session => {
                if (session.id === currentSessionId) {
                    const updatedMessages = [...session.messages, { type: 'user', text: userMessage }];
                    // Update name if it's the first message of this session
                    const shouldUpdateName = session.messages.length === 0 && updatedMessages.length === 1;
                    
                    return {
                        ...session,
                        name: shouldUpdateName ? (userMessage.substring(0, 25) + (userMessage.length > 25 ? '...' : '')) : session.name,
                        messages: updatedMessages
                    };
                }
                return session;
            })
        );
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
                const botMessageText = data.message || translations.chatbot.error;
                setChatSessions(prev => prev.map(s => s.id === currentSessionId ? {...s, messages: [...s.messages, {type: 'bot', text: botMessageText}]} : s));
            } else {
                setChatSessions(prev => prev.map(s => s.id === currentSessionId ? {...s, messages: [...s.messages, {type: 'bot', text: translations.chatbot.connectionError }]} : s));
            }
        } catch (error) {
            setChatSessions(prev => prev.map(s => s.id === currentSessionId ? {...s, messages: [...s.messages, {type: 'bot', text: translations.chatbot.connectionError }]} : s));
        } finally {
            setLoading(false);
            setSelectedFile(null); // Clear selected file after submission attempt
        }
    };

    const activeMessages = chatSessions.find(s => s.id === activeChatSessionId)?.messages || [];

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
        // Reset the file input so the same file can be selected again if removed
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };
    const handleRemoveSelectedFile = () => {
        setSelectedFile(null);
    };

    return (
        <Box sx={{ display: 'flex' }}> {/* Outer Box to manage Drawer and Main Content side-by-side */}
            {/* Drawer - Consistent with other pages */}
            <Drawer
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        bgcolor: '#166534', 
                        color: 'white',
                        borderRight: 'none',
                        position: 'relative', // Ensures drawer is part of the layout flow
                    },
                }}
            >
                <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>Menu</Typography>
                    <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Box>
                {/* Navigation Links - MOVED HERE */}
                <ListSubheader sx={{ bgcolor: '#166534', color: 'rgba(255,255,255,0.7)', lineHeight: '30px', fontWeight: 'medium' }}>Navigation</ListSubheader>
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} button onClick={() => { navigate(item.link); setDrawerOpen(false); }} sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' }}}>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ bgcolor: 'rgba(255, 255, 255, 0.12)' }} />
                {/* New Chat Button */}
                <ListItem button onClick={handleNewChat} sx={{ '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' }, borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    <ListItemText primary="➕ New Chat" primaryTypographyProps={{ sx: { color: 'white', fontWeight: 'medium' } }} />
                </ListItem>

                {/* Chat History Section */}
                <ListSubheader sx={{ bgcolor: '#166534', color: 'rgba(255,255,255,0.7)', lineHeight: '30px', fontWeight: 'medium' }}>Chat History</ListSubheader>
                <Box sx={{ overflowY: 'auto', flexGrow: 1 /* Allow history to take space */ }}>
                    <List dense>
                        {chatSessions.map((session) => (
                            <ListItem 
                                key={session.id} 
                                button 
                                onClick={() => handleSelectChat(session.id)}
                                selected={activeChatSessionId === session.id}
                                sx={{
                                    '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' },
                                    '&.Mui-selected': { bgcolor: 'rgba(255, 255, 255, 0.2)', '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.25)' } },
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.5, px:2
                                }}
                            >
                                <ListItemText 
                                    primary={session.name} 
                                    primaryTypographyProps={{ 
                                        sx: { 
                                            whiteSpace: 'nowrap', 
                                            overflow: 'hidden', 
                                            textOverflow: 'ellipsis',
                                            maxWidth: 150, // Adjust based on drawer width (240px - padding - icon)
                                            color: 'white',
                                            fontSize: '0.9rem'
                                        } 
                                    }} 
                                />
                                <IconButton 
                                    size="small" 
                                    onClick={(e) => handleDeleteChat(session.id, e)} 
                                    sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                                    aria-label="delete chat"
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            {/* Main Content Area - This will shift when the drawer opens/closes */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    transition: (theme) => theme.transitions.create('margin', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    marginLeft: `-${drawerWidth}px`, // Start with content filling space as if drawer is closed
                    ...(drawerOpen && {
                        transition: (theme) => theme.transitions.create('margin', {
                            easing: theme.transitions.easing.easeOut,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        marginLeft: 0, // Shift content to the right when drawer is open
                    }),
                    display: 'flex', flexDirection: 'column', minHeight: '100vh' // Ensure footer sticks to bottom
                }}
            >
                {/* Header/Navigation - Now part of the shifting main content */}
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
                        > {/* This button text should ideally reflect current `language` state from context */}
                            {languages[language]?.name || 'Language'}
                        </Button>
                        <Menu
                            anchorEl={languageMenu}
                            open={Boolean(languageMenu)}
                            onClose={handleLanguageClose}
                        >
                            {Object.entries(languages).map(([code, langDetails]) => (
                                <MenuItem key={code} onClick={() => { setLanguage(code); handleLanguageClose(); }}>{langDetails.name}</MenuItem>
                            ))}
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
                            {translations.chatbot.clear}
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
                    {currentMessages.length === 0 && !loading ? ( // Show welcome only if no messages and not loading
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
                            {currentMessages.map((message, index) => (
                                <ListItem key={index} sx={{
                                    display: 'flex',
                                    justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                                    p: 1
                                }}>
                                    <Paper 
                                        sx={{
                                            p: 2,
                                            maxWidth: '70%',
                                            bgcolor: message.type === 'user' ? '#dcfce7' : '#fff', // User: light green, Bot: white
                                            color: message.type === 'user' ? '#166534' : '#333',
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
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                    {selectedFile && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
                            <Chip
                                label={selectedFile.name}
                                onDelete={handleRemoveSelectedFile}
                                size="small"
                                sx={{ 
                                    maxWidth: 'calc(100% - 16px)', // Ensure chip doesn't overflow container
                                    overflow: 'hidden', 
                                    textOverflow: 'ellipsis',
                                    bgcolor: '#e0f2f7', // Light cyan background for the chip
                                    color: '#007bff' // Blue text for the chip
                                }}
                            />
                        </Box>
                    )}
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        {/* File Upload Button */}
                        <IconButton 
                            color="primary" 
                            aria-label="upload file" 
                            component="label" // Allows input to be nested
                            disabled={loading}
                            sx={{color: '#166534', p: 1}}
                        >
                            <input type="file" hidden onChange={handleFileSelect} ref={fileInputRef} />
                            <AttachFileIcon />
                        </IconButton>

                        {/* Voice Message Button */}
                        <IconButton 
                            color="primary" 
                            aria-label="record voice message" 
                            onClick={() => console.log('Record voice clicked')} // Placeholder
                            disabled={loading}
                            sx={{color: '#166534', p: 1}}
                        >
                            <MicIcon />
                        </IconButton>
                        <TextField
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={translations.chatbot.placeholder}
                            disabled={loading}
                            sx={{
                                flexGrow: 1, // Allows TextField to take available space
                                bgcolor: 'white',
                                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#22c55e' },
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#16a34a' },
                            }
                            } />
                        <Button
                            type="submit"
                            variant="contained"
                            endIcon={<SendIcon />}
                            disabled={loading || (!input.trim() && !selectedFile)}
                            sx={{ bgcolor: '#22c55e', color: '#fff', '&:hover': { bgcolor: '#16a34a' } }}
                        >
                            {translations.chatbot.send}
                        </Button>
                    </Box>
                </Box>
                </Container>
                {/* Footer - Now part of the shifting main content */}
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
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><LocationOnIcon sx={{ mr: 1, fontSize: 18 }} /><Typography variant="body2">Jakarta, Indonesia</Typography></Box> {/* Ensure this line's sx prop is typed with standard quotes */}
                        </Grid>
                    </Grid>
                    <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 2, textAlign: 'center' }}>
                        <Typography variant="body2">© {new Date().getFullYear()} PetanNaik by SawitPRO. All rights reserved.</Typography>
                    </Box>
                </Container>
                </Box>
            </Box>
        </Box>
    );
};

export default Chatbot;