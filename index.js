//var self = require('sdk/self');
//
//// a dummy function, to show how tests work.
//// to see how to test this function, look at test/test-index.js
//function dummy(text, callback) {
//  callback(text);
//}
//
//exports.dummy = dummy;

// Firefox button test
//var buttons = require('sdk/ui/button/action');
//var tabs = require("sdk/tabs");
//
//var button = buttons.ActionButton({
//  id: "mozilla-link",
//  label: "Visit Mozilla",
//  icon: {
//    "16": "./icon-16.png",
//    "32": "./icon-32.png",
//    "64": "./icon-64.png"
//  },
//  onClick: handleClick
//});
//
//function handleClick(state) {
//  tabs.open("http://www.mozilla.org/");
//}

// page modification api
var pageMod = require('sdk/page-mod');
var simpleStorage = require('sdk/simple-storage');

if (!simpleStorage.storage.tags)
  simpleStorage.storage.tags = {1091838: 'cool guy'};

pageMod.PageMod({
//  include: "*://www.strava.com/*",
  include: /.*strava.*/,
  contentScriptFile: ["./jquery-2.1.4.min.js", "./strava.js"],
  contentScript: 'loadTags(' + JSON.stringify(simpleStorage.storage.tags) +')'
});


//// Import the page-mod API
//var pageMod = require("sdk/page-mod");
// 
//// Create a page-mod
//// It will run a script whenever a ".org" URL is loaded
//// The script replaces the page contents with a message
//pageMod.PageMod({
//  include: /.*strava.com.*/,
//  contentScript: 'document.body.innerHTML = ' +
//                 ' "<h1>Page matches ruleset</h1>";'
//});
