var socket = io('http://localhost:106')
var messageContainer = document.getElementById('message-container')
var messageForm = document.getElementById('send-container')
var messageInput = document.getElementById('message-input')
var nameerror = document.getElementById('name-error')
var setname = doccument.getElementById('set-name')
var username = document.getElementById('user-name')


appendMessage('You joined')
socket.emit('new-user', name)


socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}