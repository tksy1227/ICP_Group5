import React, { useState, useRef, useEffect } from 'react';
import { 
    Box,
    Container,
    Typography,
    Paper,
    TextField, // Added missing IconButton import
    Button,
    List, 
    ListItem, 
    Select, MenuItem, ListSubheader, Divider, Chip, IconButton, Drawer, ListItemText
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import HomeIcon from '@mui/icons-material/Home';
import AttachFileIcon from '@mui/icons-material/AttachFile'; // For file uploads
import MicIcon from '@mui/icons-material/Mic'; // For voice messages
import TranslateIcon from '@mui/icons-material/Translate';
import { useLanguage, languages } from '../contexts/LanguageProvider'; // Added missing TranslateIcon import
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // For unique chat session IDs
import palmPilotLogo from '../images/petannaik_logo.png'; // Using PetanNaik logo for PalmPilot


// Use an environment variable for the API URL. On Render, you will set this in the environment settings for your frontend app.
// For local development, you can create a .env file in the `reactapp` directory.
const USER_ID = "13f5223e-f04a-4fa8-9ef2-cf36060f0d6d";

// Removed unused drawerWidth as the drawer is now handled by Layout.js
const drawerWidth = 240; // Define drawer width for consistent use

const Chatbot = () => {
    // const [messages, setMessages] = useState([]); // Replaced by chatSessions
    const [chatSessions, setChatSessions] = useState([]);
    const [activeChatSessionId, setActiveChatSessionId] = useState(null);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const messagesEndRef = useRef(null);
    const CHAT_SESSIONS_KEY = 'petanNaikChatSessions';
    const ACTIVE_CHAT_ID_KEY = 'petanNaikActiveChatId';

    const { language, setLanguage, translations } = useLanguage();
    const navigate = useNavigate();
    
    const fileInputRef = useRef(null); // Ref for the file input

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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/messaging/chatbot`, {
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
                let botMessageText = data.message || translations.chatbot.error;

                // If the selected language is not English, translate the bot's response.
                if (language !== 'en' && botMessageText) {
                    botMessageText = await translateText(botMessageText, language);
                }

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

    const translateText = async (text, targetLang) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/translate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: text,
                    target_language: targetLang,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Translation failed');
            }

            const data = await response.json();
            return data.translated_text;
        } catch (error) {
            console.error('Translation API call failed:', error);
            return `${text} (translation failed)`;
        }
    };

    const activeMessages = chatSessions.find(s => s.id === activeChatSessionId)?.messages || [];

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value); // This correctly updates the language context
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
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'white' }}>
                {/* Hero Section for Chatbot */}
                <Box
                sx={{ 
                    bgcolor: '#FEFAE0', /* Changed to FEFAE0 for hero section */
                    color: '#4D533D',
                    py: 4,
                    textAlign: 'center'
                }}
            >
                <Container>
                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', /* Stack items vertically */
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        mb: 2 
                    }}>
                        <Box
                            component="img"
                            src={palmPilotLogo} // Use imported PalmPilot logo
                            alt="PalmPilot Assistant Logo"
                            sx={{ height: 100, width: 'auto', maxWidth: '80%', objectFit: 'contain', mb: 2 }} /* Adjusted sizing and added mb */
                        />
                        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: '#166534' }}> {/* Use translations.chatbot.consultantTitle */}
                            {translations.chatbot.consultantTitle}
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9, maxWidth: '80%', mx: 'auto' }}> {/* Use translations.chatbot.consultantSubtitle */}
                            {translations.chatbot.consultantSubtitle}
                        </Typography>
                    </Box>
                </Container>
                </Box> {/* Closing tag for the hero section Box */}
                
            {/* Main Content Area: Drawer + Chat */}
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
                {/* Side Menu (Drawer) */}
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                            position: 'relative', // Important for flex layout
                            bgcolor: '#f0fdf4', // Light green background for the drawer
                            borderRight: '1px solid #e0e0e0',
                            overflowY: 'auto', // Ensure the drawer content is scrollable
                        },
                    }}
                >
                    <List sx={{ p: 2 }}>
                        <ListSubheader sx={{ bgcolor: 'inherit', fontWeight: 'bold', color: '#166534', mb: 1 }}>
                            {translations.common.menu}
                        </ListSubheader>
                        <ListItem button onClick={handleNewChat} sx={{ mb: 1 }}>
                            <ListItemText primary="New Chat" />
                        </ListItem>
                        <ListItem button onClick={() => navigate('/')} sx={{ mb: 2 }}>
                            <ListItemText primary={translations.common.home} />
                        </ListItem>
                        <Divider sx={{ mb: 2 }} />
                        <ListSubheader sx={{ bgcolor: 'inherit', fontWeight: 'bold', color: '#166534', mb: 1 }}>
                            {translations.common.language}
                        </ListSubheader>
                        <Select
                            value={language}
                            onChange={handleLanguageChange}
                            fullWidth
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
                        <Divider sx={{ my: 2 }} />
                        <ListSubheader sx={{ bgcolor: 'inherit', fontWeight: 'bold', color: '#166534', mb: 1 }}>
                            Chat History
                        </ListSubheader>
                        {chatSessions.map(session => (
                            <ListItem
                                key={session.id}
                                button
                                selected={session.id === activeChatSessionId}
                                onClick={() => handleSelectChat(session.id)}
                                sx={{
                                    mb: 0.5,
                                    '&.Mui-selected': {
                                        bgcolor: '#dcfce7',
                                        '&:hover': { bgcolor: '#c8f7d7' }
                                    }
                                }}
                            >
                                <ListItemText primary={session.name} sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} />
                                <IconButton edge="end" aria-label="delete" onClick={(e) => handleDeleteChat(session.id, e)} size="small">
                                    <DeleteIcon sx={{ fontSize: 18 }} />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>

                {/* Main Chat Content (now wider) */}
                <Container
                    maxWidth={false}
                    disableGutters
                    sx={{
                        flex: 1,
                        py: 4,
                        px: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: 'white',
                        ml: `${drawerWidth}px`,
                        width: `calc(100% - ${drawerWidth}px)` // Take up remaining width
                    }}
                >

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
                        minHeight: '60vh',
                        width: '100%' // Ensure paper takes full width
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
                                <ListItem 
                                    key={index} 
                                    sx={{
                                        py: 0.5, px:1,
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                                    }}
                                >
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center', 
                                        gap: 0.5,
                                        maxWidth: '85%', 
                                    }}>
                                        <Paper
                                            elevation={1}
                                            sx={{
                                                p: 1.5,
                                                bgcolor: message.type === 'user' ? '#dcfce7' : (message.type === 'bot' ? '#E9ECEF' : '#fff'),
                                                color: message.type === 'user' ? '#155724' : '#383D41',
                                                borderRadius: message.type === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                                            }}
                                        >
                                            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                                {message.type === 'user' ? '🧑‍💻 ' : '🤖 '}
                                                {message.text}
                                            </Typography>
                                        </Paper>
                                    </Box>
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
            </Box> {/* This closes the Box that contains the Drawer and the main chat content */}
        </Box> /* This closes the outermost Box */
    );
}
export default Chatbot;