import React, { useState, useRef, useEffect } from 'react';
import { Box, Container, Typography, Paper, TextField, Button, List, ListItem, Select, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import TranslateIcon from '@mui/icons-material/Translate';
import { useLanguage, languages } from '../contexts/LanguageContext';

const CHATBOT_API = "http://127.0.0.1:8000/api/v1/messaging/chatbot";
const USER_ID = "13f5223e-f04a-4fa8-9ef2-cf36060f0d6d";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { language, setLanguage, translations } = useLanguage();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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
                    language: language // Send language preference to API
                })
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(prev => [...prev, { type: 'bot', text: data.message || translations.chatbot.error }]);
            } else {
                setMessages(prev => [...prev, { type: 'bot', text: translations.chatbot.error }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { type: 'bot', text: translations.chatbot.connectionError }]);
        } finally {
            setLoading(false);
        }
    };

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, height: '80vh', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1">{translations.chatbot.title}</Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Select
                        value={language}
                        onChange={handleLanguageChange}
                        size="small"
                        startAdornment={<TranslateIcon sx={{ mr: 1 }} />}
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
                        color="error"
                    >
                        {translations.chatbot.clear}
                    </Button>
                </Box>
            </Box>

            <Paper 
                elevation={3} 
                sx={{ 
                    flex: 1, 
                    mb: 2, 
                    p: 2, 
                    overflow: 'auto',
                    bgcolor: '#f5f5f5'
                }}
            >
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
            </Paper>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2 }}>
                <TextField
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={translations.chatbot.placeholder}
                    disabled={loading}
                />
                <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    disabled={loading || !input.trim()}
                >
                    {translations.chatbot.send}
                </Button>
            </Box>
        </Container>
    );
};

export default Chatbot;