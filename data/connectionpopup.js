// Linked to connectionpopup.html

function fillTable(connections) {
  var tbody = document.getElementById('connectionsBody');
  var newbody = '';
  for (strava in connections) {
    var reddit = connections[strava];

    var output = '<tr><td>';
    output += reddit;
    output += '</td><td>';
    output += strava;
    output += '</td><td>';
    output += '<a>x</a>';
    output += '</td></tr>';
    newbody += output;
  }
  tbody.innerHTML = newbody;

  var as = document.getElementsByTagName('a');
  for (var i = 0; i < as.length; i++) {
    as[i].addEventListener('click', handleDeleteConnection);
  }
}

/**
 * Gets values from the text fields, clears them, sends data to index.js
 */
function handleNewConnection() {
  var redditField = document.getElementById('newreddit');
  var stravaField = document.getElementById('newstrava');
  var reddit = redditField.value;
  redditField.value = '';
  var strava = stravaField.value;
  stravaField.value = '';
  // TODO: Data validation
  self.port.emit('newConnection', {reddit: reddit, strava: strava});
}

function handleDeleteConnection(e) {
  var tr = e.target.parentNode.parentNode;
  var tds = tr.getElementsByTagName('td');
  var reddit = tds[0].innerHTML;
  var strava = tds[1].innerHTML;
  self.port.emit('deleteConnection', {reddit: reddit, strava: strava});
}

// Connect it up (13 is enter)
document.getElementById('newreddit').addEventListener('keyup', function(evt) {
  if (evt.keyCode === 13) {
    handleNewConnection();
  }
});
document.getElementById('newstrava').addEventListener('keyup', function(evt) {
  if (evt.keyCode === 13) {
    handleNewConnection();
  }
});

self.port.on('currentconnections', fillTable);
