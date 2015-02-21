var express = require('express'),
    Routes = require('./routes'),
    Db = require('./config/db'),
    config = require('./config/config');
    
var app = express();

var port = config.server.port;

var http = require('http').Server(app);

var io = require('socket.io')(http);

app.use(express.static(__dirname + '/../client/src'));

// parse urlencoded request bodies into req.body
app.use(express.bodyParser())

require('./routes')(app);

io.on('connection', function(socket){
	console.log('a user connected');	
  	socket.on('chat message', function(msg){
    	console.log('message: ' + msg);
  	});

 	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(port, function(){
  console.log('Express app started on port ' + port);
});