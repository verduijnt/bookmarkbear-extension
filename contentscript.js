console.log("side-panel script loaded");

chrome.runtime.onMessage.addListener(function (msg, sender) {
  if (msg == "toggle") {
    console.log("message received");
    toggle();
  }
});

// Avoid recursive frame insertion...
var extensionOrigin = "chrome-extension://" + chrome.runtime.id;
if (!location.ancestorOrigins.contains(extensionOrigin)) {
  var iframe = document.createElement("iframe");
  // Must be declared at web_accessible_resources in manifest.json
  iframe.src = chrome.runtime.getURL("frame.html");

  // Some styles for a fancy sidebar
  iframe.style.cssText =
    "position:fixed;top:0;right:0;display:block;" +
    "width:0px;height:100%;z-index:9999;";
  document.body.appendChild(iframe);
}

function toggle() {
  if (iframe.style.width == "0px") {
    iframe.style.width = "300px";
  } else {
    iframe.style.width = "0px";
  }
}
