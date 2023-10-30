const express = require('express'); // Import express
const app = express(); // Instantiate express
const cors = require('cors'); // Import cors
const Gpio = require('onoff').Gpio; // Import onoff library and instantiate GPIO

app.use(express.static('public')); // Serve static files from public directory
app.use(express.json()); // Add express.json middleware
app.use(cors()); // Add cors middleware


const ledPins = {
    led1: new Gpio(17, 'out'), // Initialize LED 1 pin
    led2: new Gpio(18, 'out'), // Initialize LED 2 pin
    led3: new Gpio(27, 'out'), // Initialize LED 3 pin
};

// Simulated user credentials for authentication
const validUser = {
    username: 'user',
    password: 'password',
};

app.post('/authenticate', (req, res) => { // Handle POST request to /authenticate
    const { username, password } = req.body; // Get username and password from request body
    
    if (username === validUser.username && password === validUser.password) { // Check if username and password are correct
        res.json({ success: true }); // Send success response
    } else {
        res.json({ success: false }); // Send failure response
    }
});

app.get('/get-led-state/:led', (req, res) => { // Handle GET request to /get-led-state/:led
    const { led } = req.params; // Get led from request parameters
    try {
        const ledState = ledPins[led].readSync() === 1; // Read LED state
        res.json({ ledState }); // Send LED state back as response
    } catch (error) {
        console.error('Error:', error); // Log error message to console
        res.status(500).json({ error: `Failed to read ${led} state` }); // Send error response
    }
});

app.post('/toggle-led/:led', (req, res) => { // Handle POST request to /toggle-led/:led
    const { led } = req.params; // Get led from request parameters
    try {
        const currentValue = ledPins[led].readSync(); // Read LED state
        ledPins[led].writeSync(currentValue === 0 ? 1 : 0); // Toggle LED state
        res.json({ success: true }); // Send success response
    } catch (error) {
        console.error('Error:', error); // Log error message to console
        res.status(500).json({ error: `Failed to toggle ${led}` }); // Send error response
    }
});


// Handle process termination and clean up
process.on('SIGINT', () => {
    process.exit();    // Exit the process
});

const PORT = 3000; // Port number
app.listen(PORT, () => { // Start server on port 3000
   console.log(`Server is running on port ${PORT}`); // Log message to console
});
