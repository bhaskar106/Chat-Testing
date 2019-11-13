var app =require('express')();

var http = require('http').Server(app);

var io = require ('socket.io')(http);

app.get('/', (req, res)  => {
  res.sendFile(__dirname + '/client.html');
})

http.listen(106, () =>{
  console.log('Server is started')
})

var users = [];
var a=1;
var b="string";
//var c={a=1};
//var d={{a,b},{c,d}};
//var e={{a=1},{b="string"},{c={a=1}},{d={{a,b},{c,d}}};
//var f=[1,2,3,4];
//var g=["hi","how","are","you"];
//var h=[{a=1},{b=2},{c=3}];
//var i=[{a=1},{b="string"},{c={a=1}},{d={{a,b},{c,d}}]
//var j=[[1,2,3,4],["hi","how","are","you"]];


io.sockets.on('connection', socket => {
  console.log('connected');
  socket.on('new-user', name => {
    console.log('new user');
      users[socket.id] = name;
      io.sockets.emit('username',name);
      socket.emit('id',socket.id);
      socket.emit('Allusers',users);
      console.log(Object.keys(users));
      console.log(Object.values(users));
      console.log(users);
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
