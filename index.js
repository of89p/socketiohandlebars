const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const routes = require('./routes');
const exphbs = require('express-handlebars');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
    socket.on('joinRoom', () => {
        console.log(socket.id);
    });  
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set routes
app.use('/', routes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, (err) => {
    console.log(`Server running on port ${PORT}...`);
});