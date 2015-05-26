// YOUR CODE HERE:


var message = {
  'username': 'your mom',
  'text' : 'hello world',
  'roomname': '4chan'
};



var app = {
  init : function() {
    app.addRoom("All");
    app.fetch();
  },

  friends : {},

  message : {
    'username': 'your mom',
    'text' : 'hello world',
    'roomname': '4chan'
  },

  room : "All",

  server: 'https://api.parse.com/1/classes/chatterbox',

  send : function(message) {
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        // $('#chats').append("<div>" + data.results[0].username + ": " + data.results[0].text + "</div>")
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  clearMessages : function() {
    $('#chats').empty();
  },

  addMessage : function(message) {
    $('#chats').append("<div>" + message.username + ": " + message.text + "</div>");
    // debugger;
    // console.dir($('#chats').children().length);
    // app.send(something);
    // app.send(message);
  },

  addRoom : function(room) {
    $('#roomSelect').append("<option>" + room + "</option>");
  },

  addFriend : function(friend) {
    app.friends[friend] = true;
  },

  changeRoom : function(room) {
    app.room = room;
    app.fetch();
  },

  fetch : function() {
    app.clearMessages();
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        // debugger;
        for (var i = 0; i < data.results.length; i++){
          if (data.results[i].text === undefined) {
            console.error('stop sending message assholes');
          } else if (data.results[i].text.includes("<")) {
            console.error('terrible thing avoided!!!11!');
          } else if (app.room === "All" || app.room === data.results[i].roomname) {
            if (!app.friends[data.results[i].username]) {
              console.log('100 of me!!');
              $('#chats').append("<div class='username' id='chat'>" + data.results[i].roomname + ": " + data.results[i].username + ": " + data.results[i].text + "</div>")
            } else {
              console.log('friend!!');
              $('#chats').append("<div class='username' id='chat'>" + "[" + data.results[i].roomname + "]: <strong>" + data.results[i].username + "</strong>: " + data.results[i].text + "</div>")
            }
          }
        }
      },
      error: function (data) {
        // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to recieve message');
      }
    });
  }
};


$(document).ready(function() {
  $('#refresh').on('click', function() {
    app.fetch();
  });

  $('#main').on('click', '.username', function() {
    app.addFriend(event.toElement.innerText.split(": ")[1]);
  });

  //something on click
  //  call send with message while editing app.message.text to what we recieved from the form
  $('#post').on('click', function(){
    app.message.text = $('#speakHere').val();
    app.send(app.message);
    app.fetch();
  });

  $('#me').on('click', function(){
    app.message.username = $('#fillme').val();
  });

  $('#submitroom').on('click', function(){
    app.addRoom($('#newroom').val());
  });

  app.init();
});

