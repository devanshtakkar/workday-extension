chrome.action.onClicked.addListener(async (tab) => {
  // open the default popup only when the jwt is not present in the local storage
  try {
    const result = await chrome.storage.local.get(["jwt"]);
    if (!result.jwt) {
      // set the popup html to the popup.html file
      await chrome.action.setPopup({
        popup: "../popup.html",
      });

      await chrome.action.openPopup();
    }
  } catch (error) {
    console.error("Error accessing storage:", error);
  }
});
