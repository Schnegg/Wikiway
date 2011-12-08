var express = require('express');
var socketio = require('socket.io');

var port = 1337;

var server = express.createServer();
var io = socketio.listen(server);

server.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

io.sockets.on('connection', function(client) {

	client.emit('getUsername');

    client.on('message', function(msg) {
        client.send("<b>You</b>: "+msg);
        client.broadcast.send("<b>"+client.username+"</b>: "+msg);
    });
	
    client.on('setUsername', function(username) {
		client.username = username;
        client.broadcast.send("<b>"+username+" ist dem Chat beigetreten.</b>");
    });
	
    client.on('disconnect', function() {
        client.broadcast.send("<b>"+client.username+" hat den Chat verlassen.</b>");
    });
});

server.listen(port);