const express = require('express');
const app = express();

http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');

const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');
var cors = require('cors');
// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {

    console.log('Connected to database ' + config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});
//Connect

const io = socketIO(server);
module.exports.ios = function(topic, data) {     //sir should it be module.exports.io ?
    msg = {
        payload: data
    };
    io.emit(topic, msg);
    //console.log('topic is: ' + topic + ' msg: ' + msg.payload);
};

io.on('connection', (socket) => {

    console.log('Websocket Client Connected');
    //Disconnect
    socket.on('disconnect', (data) => {
        console.log('Websocket Client Disconnected');
    });
});
// Routes
const users = require('./routes/users');
const gateways = require('./routes/gateways');


// Port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Directing Routes
app.use('/users', users);
app.use('/gateways', gateways);
// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
server.listen(port, () => {
    console.log('Server started on port ' + port);
});
