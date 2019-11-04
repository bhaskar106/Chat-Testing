var app =require('express')();

var http = require('http').Server(app);

var io = require ('socket.io')(http);

app.get('/', (req, res)  => {
  res.sendFile(__dirname + '/client.html');
})

http.listen(106, () =>{
  console.log('Server is started')
})

var users = {};
var clients = [];

io.sockets.on('connection', socket => {
  console.log('connected');
  socket.on('new-user', name => {
    console.log('new user');
      //users[socket.id] = name;
      users[socket.id] = name;
      //clients[id]=users;
      io.sockets.emit('username',name);
      socket.emit('id',socket.id);
      socket.emit('Allusers',users);
      console.log(Object.keys(users));
      console.log(Object.values(users));
      console.log(users);
      console.log(clients);
      clients = Object(users);
      console.log(Object(clients));
      socket.emit('clients', Object.values(users));
      socket.broadcast.emit('user-connected', name);
  })


  socket.on('send-chat-message', message => {
    console.log('sending message');
    socket.broadcast.emit('chat-message', { message:message, name: users[socket.id] });
   /*socket.broadcast.to(users[socket.id]).emit('message',{ message:message, name: users[socket.id] });*/
  });


  socket.on('disconnect', () => {
    console.log('disconnected');
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
    //users.splice(users.indexOf(socket), 1);
  });


});
