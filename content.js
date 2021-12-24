chrome.runtime.sendMessage({
    from: 'content',
    subject: 'showPageAction',
});

var wordCounter = {};
var allKeys = [];

chrome.storage.sync.get(null, function(items) {
    allKeys = Object.keys(items);
	replace();
});

function replace() {
	tags = document.getElementsByTagName('*');

	for ( var i = 0; i < tags.length; i++) {
		var element = tags[i];

		for ( var j = 0; j < element.childNodes.length; j++) {
			var node = element.childNodes[j];

			if ( node.nodeType === 3 ) {
				var text = node.nodeValue;
				text = text.toString();
				allKeys.forEach( function( dictionaryItem ) {
					var newText = text.includes( dictionaryItem );
					if ( newText ) {
						if (wordCounter[dictionaryItem]) {
							wordCounter[dictionaryItem] += 1;
						} else {
							wordCounter[dictionaryItem] = 1;
						}
						node.nodeValue = '******';
					}
				});
			}
		}
	}
}



  // Listen for messages from the popup.
  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    // First, validate the message's structure.
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
      response(wordCounter);
    }
  });
  