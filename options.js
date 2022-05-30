"use strict";

let wordlist = document.getElementById('wordlist');
let status = document.getElementById('status');

function saveOptions() {
  if(wordlist){
    chrome.storage.sync.set({
      wordlist: wordlist.value
    }, function() {
      status.textContent = 'Options saved. Please reload the page you are using.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  } else {
      status.textContent = 'Invalid options.';
      setTimeout(function() {
        status.textContent = '';
      }, 1000);
  }
}

function restoreOptions() {
  chrome.storage.sync.get( null, function(items){
    if(items["wordlist"] && items["wordlist"] != 'undefined'){
      wordlist.value = items["wordlist"];
    }else{
      wordlist.value = "# Default Category\nThis is a test item";
    }
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);