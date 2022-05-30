var contents = {}

function loadList(){
  chrome.contextMenus.removeAll();

  // Create parent menu
  var parent = chrome.contextMenus.create({'id': 'main', "title": "Wordlist Menu", "contexts":["editable"]});

  chrome.storage.sync.get( null, function(items){
    var wordlistString = items["wordlist"];
    if(wordlistString){
      contents = wordlistString.split("\n");

      var category = null;
      for (var i = 0; i < contents.length; i++) {
        var content = contents[i];
        if(content){
          if (!content.startsWith("# ") && i == 0){
            category = chrome.contextMenus.create({'id': 'category'+i, "parentId" : parent, "title": "Default", "contexts":["editable"]});
          }else if(content.startsWith("# ")){
            category = chrome.contextMenus.create({'id': 'category'+i, "parentId" : parent, "title": content, "contexts":["editable"]});
          }
          
          if(!content.startsWith("# ")){
            var id = chrome.contextMenus.create({'id': 'wordlist'+i, "parentId" : category, "title": content, "contexts":["editable"]});
          }
        }
      }
    }

  });
}


chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId.startsWith("wordlist")) {
    var content = contents[parseInt(info.menuItemId.replace("wordlist", ""))];
    chrome.tabs.sendMessage(tab.id, {text: content});
  }
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
  loadList();
});

loadList();
