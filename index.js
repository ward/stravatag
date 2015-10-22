// page modification api
var pageMod = require('sdk/page-mod');
var simpleStorage = require('sdk/simple-storage');

if (!simpleStorage.storage.tags) {
  simpleStorage.storage.tags = {};
}
// Format of stravaid => redditusername
if (!simpleStorage.storage.redditstrava) {
  simpleStorage.storage.redditstrava = {
    1091838: 'wardmuylaert',
    2232601: 'Jaime_Manger'
  };
}

/**
 * Handles receiving of a new tag
 *
 * @param tag object Properties id (strava id) and tag (the text)
 */
function newTag(tag) {
  console.log('Tag received', tag);
  if (tag['tag'] === null || tag['tag'] === '' || tag['tag'] === undefined) {
    delete simpleStorage.storage.tags[tag['id']];
  } else {
    simpleStorage.storage.tags[tag['id']] = tag['tag'];
  }
}

/**
 * Handles receiving of a new reddit-strava connection
 *
 * @param connection object Properties: reddit (username) and strava (id)
 */
function connectRedditStrava(connection) {
  console.log('New connection', connection);
  // TODO: Validate input (or do it at input)
  simpleStorage.storage.redditstrava[connection.strava] = connection.reddit;
}

function disconnectRedditStrava(connection) {
  console.log('Delete connection', connection);
  delete simpleStorage.storage.redditstrava[connection.strava];
}

/**
 * Modifies Strava pages
 */
pageMod.PageMod({
  // Regex! The wildcard is useless
  include: /.*strava.*/,
  contentScriptFile: ['./jquery-2.1.4.min.js', './strava.js'],
  onAttach: function(worker) {
    // Message to content script
    worker.port.emit('currentTags', simpleStorage.storage.tags);
    worker.port.emit('currentconnections', simpleStorage.storage.redditstrava);
    // Message from content script
    worker.port.on('newTag', newTag);
  }
});
/**
 * Modifies reddit pages
 */
pageMod.PageMod({
  include: /^https?:\/\/www\.reddit\.com.*$/,
  contentScriptFile: ['./reddit.js'],
  contentStyleFile: ['./reddit.css'],
  onAttach: function(worker) {
    // Message to content script
    worker.port.emit('currentconnections', simpleStorage.storage.redditstrava);
  }
});


function showConnections() {
  connectionPopup.show();
}
// Show connections when the listPref button is clicked in preferences
require('sdk/simple-prefs').on('listPref', showConnections);

// The pop up showing the current connections
var connectionPopup = require('sdk/panel').Panel({
  contentURL: './connectionpopup.html',
  contentScriptFile: ['./connectionpopup.js'],
  width: 600,
});
// show event is on this end, send over the current connections when this happens
connectionPopup.on('show', function() {
  connectionPopup.port.emit('currentconnections', simpleStorage.storage.redditstrava);
});

// When receiving a new connection, save it and send updated connection list back
connectionPopup.port.on('newConnection', function(obj) {
  connectRedditStrava(obj);
  connectionPopup.port.emit('currentconnections', simpleStorage.storage.redditstrava);
});
// When receiving a delete connection, remove the entry and send updated
// connection list back.
connectionPopup.port.on('deleteConnection', function(obj) {
  disconnectRedditStrava(obj);
  connectionPopup.port.emit('currentconnections', simpleStorage.storage.redditstrava);
});


/**
 * Exporting of the current connections
 */
function handleExport() {
  // Get only pathFor from sdk/system
  const { pathFor } = require('sdk/system');
  const path = require('sdk/fs/path');
  const file = require('sdk/io/file');
  // Writing to the default download directory, see
  // https://developer.mozilla.org/en-US/Add-ons/Code_snippets/File_I_O#Getting_files_in_special_directories
  // for full list of possibilities
  var filename = path.join(pathFor('DfltDwnld'), 'stravatag.json');
  var f = file.open(filename, 'w');
  f.write(JSON.stringify(simpleStorage.storage.redditstrava, null, '\t'));
  f.close();
}
require('sdk/simple-prefs').on('exportPref', handleExport);

/**
 * And importing
 */
function handleImport() {
  const filepicker = require('./lib/filepicker.js');
  let path = filepicker.promptForFile();
  if (path !== undefined) {
    const file = require('sdk/io/file');
    let f = file.open(path, 'r');
    let imported = JSON.parse(f.read());
    for (var stravaid in imported) {
      simpleStorage.storage.redditstrava[stravaid] = imported[stravaid];
    }
    f.close();
  }
}
require('sdk/simple-prefs').on('importPref', handleImport);

/**
 * Clearing
 */
function handleClearAll() {
  var {Cu, Ci} = require('chrome');
  Cu.import('resource://gre/modules/Services.jsm');
  var doit = Services.prompt.confirm(null, 'Remove all connections?', 'If you go through with this action, all the existing connections will be removed. This operation cannot be undone. Are you sure?');
  if (doit) {
    simpleStorage.storage.redditstrava = {};
  }
}
require('sdk/simple-prefs').on('clearAllPref', handleClearAll);
