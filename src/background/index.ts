chrome.action.onClicked.addListener((tab) => {
  console.log("clicked");
  chrome.sidePanel.open({ windowId: tab.windowId });
}); 