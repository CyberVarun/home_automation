const express = require('express');
const app = express();
const cors = require('cors');
const Gpio = require('onoff').Gpio;

app.use(express.static('public'));
app.use(express.json()); 
app.use(cors());


const ledPins = {
    led1: new Gpio(17, 'out'), // Initialize LED 1 pin
    led2: new Gpio(18, 'out'), // Initialize LED 2 pin
};

// Simulated user credentials for authentication
const validUser = {
    username: 'user',
    password: 'password',
};

app.post('/authenticate', (req, res) => {
    const { username, password } = req.body;
    
    if (username === validUser.username && password === validUser.password) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.get('/get-led-state/:led', (req, res) => {
    const { led } = req.params;
    try {
        const ledState = ledPins[led].readSync() === 1;
        res.json({ ledState });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: `Failed to read ${led} state` });
    }
});

app.post('/toggle-led/:led', (req, res) => {
    const { led } = req.params;
    try {
        const currentValue = ledPins[led].readSync();
        ledPins[led].writeSync(currentValue === 0 ? 1 : 0); // Toggle LED state
        res.json({ success: true });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: `Failed to toggle ${led}` });
    }
});


// Handle process termination and clean up
process.on('SIGINT', () => {
    process.exit();    // Exit the process
});

const PORT = 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
