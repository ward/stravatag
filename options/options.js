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
  var data = {};
  data[strava] = reddit;
  // TODO: Data validation
  browser.storage.local.set(data);
}

function handleDeleteConnection(e) {
  var tr = e.target.parentNode.parentNode;
  var tds = tr.getElementsByTagName('td');
  var reddit = tds[0].innerHTML;
  var strava = tds[1].innerHTML;
  browser.storage.local.remove(strava);
}


document.addEventListener('DOMContentLoaded', function() {

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

  var connections_p = browser.storage.local.get(null);
  connections_p.then(fillTable, function(err) { console.log(err); });
});

browser.storage.onChanged.addListener(function(changes, area) {
  var connections_p = browser.storage.local.get(null);
  connections_p.then(fillTable, function(err) { console.log(err); });
});


document.getElementById('export').addEventListener('click', function(evt) {
  let alldatapromise = browser.storage.local.get(null);
  alldatapromise.then(function(res) {
    document.getElementById('rawfield').value = JSON.stringify(res);
  }, function(err) {
    console.log(err);
  });
});
document.getElementById('import').addEventListener('click', function(evt) {
  let newdata = JSON.parse(document.getElementById('rawfield').value);
  let savingpromise = browser.storage.local.set(newdata);
  savingpromise.then(function() {
    console.log('New data saved.');
  }, function(err) {
    console.log('Something went wrong importing data');
    console.log(err);
  });
});

document.getElementById('deleteall').addEventListener('click', function(evt) {
  let clearpromise = browser.storage.local.clear();
  clearpromise.then(function() {
    console.log('All data cleared.');
  }, function(err) {
    console.log('Something went wrong clearing all data');
    console.log(err);
  });
});
