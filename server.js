var express = require('express');
var socketio = require('socket.io');

var port = 1337;

var server = express.createServer();
var io = socketio.listen(server);

server.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

io.sockets.on('connection', function(client) {
    console.log('connected');
    client.broadcast.send('... new client connected.');
    client.on('message', function(msg) {
        console.log(msg);
        client.send(msg);
        client.broadcast.send(msg);
		if(msg == "123"){
			client.broadcast.emit('winning');
		}
    });
	
    client.on('json', function(data) {
        client.broadcast.send(data);
    });	
	
    client.on('disconnect', function() {
        console.log('disconnect');
    });
});

server.listen(80);