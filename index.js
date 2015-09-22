// page modification api
var pageMod = require('sdk/page-mod');
var simpleStorage = require('sdk/simple-storage');

if (!simpleStorage.storage.tags) {
  simpleStorage.storage.tags = {};
}

pageMod.PageMod({
  // Regex! The wildcard is useless
  include: /.*strava.*/,
  contentScriptFile: ['./jquery-2.1.4.min.js', './strava.js'],
  onAttach: function(worker) {
    // Message to content script
    worker.port.emit('currentTags', simpleStorage.storage.tags);
    // Message from content script
    worker.port.on('newTag', function(newTag) {
      console.log('Tag received', newTag);
      if (newTag['tag'] === null || newTag['tag'] === '' || newTag['tag'] === undefined) {
        delete simpleStorage.storage.tags[newTag['id']];
      } else {
        simpleStorage.storage.tags[newTag['id']] = newTag['tag'];
      }
    });
  }
});
