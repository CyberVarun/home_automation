# LED Control with Node.js and Raspberry Pi

Control LEDs on a Raspberry Pi using Node.js and the `onoff` library. This project demonstrates how to create a web-based interface to toggle the state of LEDs connected to GPIO pins. It includes a simple frontend to control the LEDs and provides an example of setting up a Node.js server for GPIO interaction.

## Features

- Toggle the state of LEDs connected to GPIO pins remotely using a web interface.
- Illustrates the usage of the `onoff` library to control GPIO pins on a Raspberry Pi.
- Provides a basic web frontend to visually interact with the LEDs.
- Easily customizable to control other GPIO-based devices or components.

## Installation

1. Clone this repository to your Raspberry Pi.
2. Install Node.js and npm if not already installed.
3. Run `npm install` to install the required dependencies.
4. Connect LEDs to GPIO pins (modify pin numbers as needed in app.js default is pin 17 & 18 for Rapsberry Pi 3 b).
5. Start the Node.js server: `node app.js`.

## Usage

1. Access the web interface from your browser (Raspberry Pi IP and port 3000 Example: http://192.168.1.2:3000).
2. Click on the toggle buttons to turn LEDs on and off.

## Contributing

Contributions are welcome! Feel free to submit pull requests or report issues.
