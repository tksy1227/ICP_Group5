// reactapp-backend/server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const fetch = require('node-fetch'); // Or use global fetch if available in your Node version
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // Backend will run on this port

// --- Environment Variables ---
// Make sure to create a .env file in your backend's root directory
// and add your Turnstile Secret Key there:
// CLOUDFLARE_TURNSTILE_SECRET_KEY=YOUR_ACTUAL_SECRET_KEY
const TURNSTILE_SECRET_KEY = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;

if (!TURNSTILE_SECRET_KEY) {
    console.error("FATAL ERROR: CLOUDFLARE_TURNSTILE_SECRET_KEY is not set in .env file.");
    process.exit(1); // Exit if the secret key is not found
}

// --- Middleware ---
// Configure CORS
const allowedOrigins = [
    'http://localhost:3000', // Your local React development server
        'https://front-end-deployment-ei2n.onrender.com' // Your deployed frontend URL
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies

// --- In-memory "Database" (Replace with a real database in production) ---
let users = []; // This will store your users for now

// --- Helper Function to Verify Turnstile Token ---
async function verifyTurnstileToken(token, remoteIp) {
    const verificationUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const body = new URLSearchParams({
        secret: TURNSTILE_SECRET_KEY,
        response: token,
    });
    // Cloudflare recommends sending the user's IP address for better security
    // if (remoteIp) {
    //   body.append('remoteip', remoteIp);
    // }

    try {
        const response = await fetch(verificationUrl, {
            method: 'POST',
            body: body,
        });
        const data = await response.json();
        return data; // { success: true/false, 'error-codes': [], ... }
    } catch (error) {
        console.error('Error verifying Turnstile token:', error);
        return { success: false, 'error-codes': ['verification-request-failed'] };
    }
}

// --- API Routes ---

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).send('PetanNaik Backend is running!');
});

// Registration Endpoint
app.post('/api/register', async (req, res) => {
    const { name, email, password, turnstileToken } = req.body;
    // const clientIp = req.ip; // Get client IP if your proxy setup allows

    if (!name || !email || !password || !turnstileToken) {
        return res.status(400).json({ message: 'All fields, including Turnstile token, are required.' });
    }

    // 1. Verify Turnstile token
    const turnstileVerification = await verifyTurnstileToken(turnstileToken /*, clientIp */);

    if (!turnstileVerification.success) {
        console.log('Turnstile verification failed:', turnstileVerification['error-codes']);
        return res.status(400).json({ message: 'Human verification failed. Please try again.', errors: turnstileVerification['error-codes'] });
    }

    // 2. Proceed with registration logic (replaces localStorage logic)
    if (users.find(u => u.email === email)) {
        return res.status(409).json({ message: 'User with this email already exists.' }); // 409 Conflict
    }

    // In a real app, HASH THE PASSWORD before storing it!
    // const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: Date.now().toString(), // Use a more robust ID in production (e.g., UUID)
        name,
        email,
        password, // STORE HASHED PASSWORD
    };
    users.push(newUser);
    console.log('User registered:', newUser.email);
    console.log('Current users:', users);


    // Respond with success (and potentially user data, excluding password)
    // In a real app, you'd generate a session token (JWT) here for auto-login
    res.status(201).json({
        message: 'User registered successfully!',
        user: { id: newUser.id, name: newUser.name, email: newUser.email }
    });
});

// Login Endpoint
app.post('/api/login', async (req, res) => {
    const { email, password, turnstileToken } = req.body;
    // const clientIp = req.ip;

    if (!email || !password || !turnstileToken) {
        return res.status(400).json({ message: 'Email, password, and Turnstile token are required.' });
    }

    // 1. Verify Turnstile token
    const turnstileVerification = await verifyTurnstileToken(turnstileToken /*, clientIp */);

    if (!turnstileVerification.success) {
        console.log('Turnstile verification failed:', turnstileVerification['error-codes']);
        return res.status(400).json({ message: 'Human verification failed. Please try again.', errors: turnstileVerification['error-codes'] });
    }

    // 2. Proceed with login logic (replaces localStorage logic)
    const user = users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' }); // Unauthorized
    }

    // In a real app, compare the provided password with the HASHED password from the database
    // const isMatch = await bcrypt.compare(password, user.password);
    // For this example, direct comparison (NOT SECURE FOR PRODUCTION)
    if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    console.log('User logged in:', user.email);

    // Respond with success (and user data, excluding password)
    // In a real app, you'd generate a session token (JWT) here
    res.status(200).json({
        message: 'Login successful!',
        user: { id: user.id, name: user.name, email: user.email }
    });
});


// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
