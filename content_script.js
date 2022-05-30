const keyboardEventInit = {bubbles:false, cancelable:false, composed:false, key:'', code:'', location:0};

chrome.runtime.onMessage.addListener(function (request) {
    replaceSelectedText(document.activeElement, request.text);
});

function replaceSelectedText(elem, text) {
    elem.dispatchEvent(new KeyboardEvent("keydown", keyboardEventInit));
    var start = elem.selectionStart;
    var end = elem.selectionEnd;
    console.log("start: " + start + ", end: " + end);
    elem.value = elem.value.slice(0, start) + text + elem.value.substr(end);
    elem.selectionStart = start + text.length;
    elem.selectionEnd = elem.selectionStart;
    elem.dispatchEvent(new KeyboardEvent("keyup", keyboardEventInit));
    elem.dispatchEvent(new Event('change', {bubbles: true}));
}