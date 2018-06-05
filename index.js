var express = require ('express');
var socket = require('socket.io');

// App set up
var app = express();
var server = app.listen(4000, function(){
    console.log('listening to request on port 4000');
});


//static files
app.use(express.static('public'));

//Socket setup
var io = socket(server); // we want socket.io to work on this server

/*when each client connects we gana listen that from this connection method, it connect to server and then we 
fire the call back function which passes through this socket between the client making the connection between
client and server*/
io.on('connection', function(socket){
    console.log('made socket connection', socket.id)

    // it send back all data that recieved by server to all the clients
    //Handle chat evant
    socket.on('chat', function(data){  
        io.sockets.emit('chat', data);
    });

    // Handle typing event
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });
});