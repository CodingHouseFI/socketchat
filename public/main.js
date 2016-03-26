'use strict';

var socket = io();

var $message, $send, $chat, $name, $start;

var username;

$(document).ready(init);

function init() {
  $message = $('#message');
  $send = $('#send');
  $chat = $('#chat');
  $name = $('#name');
  $start = $('#start');

  $start.click(startMessaging);
  $send.click(sendMessage);
  $message.on('keypress', enterMessage);
}

function startMessaging() {
  username = $name.val();

  if(username) {
    $('#nameSelect').hide();
    $('#chatArea').show();
  }
}

function enterMessage(e){
  if(e.which === 13) sendMessage();
}

function sendMessage() {
  var message = $message.val();
  $message.val('');
  socket.emit('new message', {
    body: message,
    username: username
  });
}

socket.on('message', function(message) {
  $chat.append(chatItem(message));
});

socket.on('history', function(history) {
  var $lis = history.map(function(message) {
    return chatItem(message);
  });
  $chat.append($lis);
});

function chatItem(message) {
  var $li = $('<li>');
  $li.text(`${message.username} - ${message.body}`)
  return $li;
}

socket.on('broadcast message', function(message) {
  console.log('broadcast message:', message);
});




