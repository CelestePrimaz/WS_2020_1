const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server);

io.on('connection', socket => {
    
    var Twitter = require('node-tweet-stream')
        socket = new Twitter({
      consumer_key: '', //insira suas chaves entre as ' ' 
      consumer_secret: '', 
      token: '', 
      token_secret: ''  
    })

    socket.track('socket.io');
    socket.track('Netflix'); // assunto do Tweet

    socket.on('tweet', function (tweet) { 
        io.emit('tweet', tweet);
        console.log('tweet received', tweet);
      })
       
      socket.on('error', function (err) {
        console.log('Error', err)
      })
});

module.exports = server;