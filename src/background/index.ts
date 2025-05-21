chrome.action.onClicked.addListener(async (tab) => {
  console.log("fuck");
  // open the default popup only when the jwt is not present im the local storage
  const jwt = await chrome.storage.local.get("jwt");
  if (!jwt) {
    // set the popup html to the popup.html file
    chrome.action.setPopup({
      popup: "../popup.html",
    });

    chrome.action.openPopup()
  }
});
