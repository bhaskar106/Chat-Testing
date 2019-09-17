var socket = io('http://localhost:106')
var messageContainer = document.getElementById('message-container')
var messageForm = document.getElementById('send-container')
var messageInput = document.getElementById('message-input')

var name = prompt("Enter your name:" ,  "")
if(name == null || name == "" ){
  console.log('working6')
  alert("Please enter a different user name");
}
else{
  console.log('working7')
  appendMessage('You joined');
  socket.emit('new-user', name);
}

/*var data = []; // creating array

function add_user(){
data.push(document.getElementById('user').value); // adding element to array
document.getElementById('user').value=''; // Making the text box blank
disp(); // displaying the array elements
}

function disp(){
var str='';
str = 'total number of users connected : ' + data.length + '<br>';
for (i=0;i<data.length;i++) 
{ 
str += i + ':'+data[i] + "<br >";  // adding each element with key number to variable
} 
document.getElementById('disp').innerHTML=str; // Display the elements of the array
}*/

socket.on('chat-message', data => {
  console.log('working8')
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  console.log('working9')
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  console.log('working10')
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}











