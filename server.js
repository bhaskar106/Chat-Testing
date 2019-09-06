var http = require('http')
var fs = require('fs')
var io = require('socket.io')(app)
var app=http.createServer(function(req,res){
  fs.readFile('Chat.html',function(err,data){
    res.writeHead(200,{'Content-Type': 'text/html'})
    res.write(data)
    res.end()
  })
}).listen(106)

var users = []
console.log(socket.emit(users))

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
  })
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})