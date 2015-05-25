// YOUR CODE HERE:
var message = {
  'username': 'your mom',
  'text' : '(<div>someshit</div>)',
  'roomname': '4chan'
};

// $.ajax({
//   // always use this url
//   url: 'https://api.parse.com/1/classes/chatterbox',
//   type: 'POST',
//   data: JSON.stringify(message),
//   contentType: 'application/json',
//   success: function (data) {
//     console.log('chatterbox: Message sent');
//   },
//   error: function (data) {
//     // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message');
//   }
// });

var refresh = function() {
  $('#messages').empty();
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.dir(data);
      for (var i = 0; i < data.results.length; i++){
        console.log(typeof data.results[i].text)
        if(data.results[i].message !== undefined){
          console.error('terrible thing avoided!!!11!' + data.results[i].text)
        } else if (!data.results[i].text && data.results[i].text.length !== 0 && (data.results[i].text[0] === "<" || data.results[i].text[0] === "$" || data.results[i].text[data.results[i].text.length-1] === ">")) {
          console.error('terrible thing avoided!!!11!' + data.results[i].text)
        } else {
          $('#messages').append("<div>" + data.results[i].username + ": " + data.results[i].text + "</div>")
        }

      }
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
}

$(document).ready(function() {
  $('#refresh').on('click', function() {
    refresh();
  });
});
refresh();
