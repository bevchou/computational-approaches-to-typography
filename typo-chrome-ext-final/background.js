console.log("beverly - background.js");

chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('clicked');
  chrome.tabs.executeScript(null, {file: "myscript.js"});
});
