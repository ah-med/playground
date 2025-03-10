function getWordCount(text) {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

function getCharacterCount(text, includeSpaces = true) {
  if (includeSpaces) {
    return text.length;
  }
  return text.replace(/\s/g, "").length;
}

function getPageText() {
  // Clone the body to avoid modifying the actual page
  const bodyClone = document.body.cloneNode(true);

  // Remove script and style elements
  const scriptsAndStyles = bodyClone.querySelectorAll(
    "script, style, noscript"
  );
  scriptsAndStyles.forEach((element) => element.remove());

  return bodyClone.textContent || "";
}

function analyzePage() {
  const pageText = getPageText();
  return {
    wordCount: getWordCount(pageText),
    charCountWithSpaces: getCharacterCount(pageText, true),
    charCountWithoutSpaces: getCharacterCount(pageText, false),
  };
}

// message listener for communication with popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getCount") {
    const counts = analyzePage();
    sendResponse(counts);
  }
  return true; // Required to use sendResponse asynchronously
});

// Listen for DOM changes to update counts in real-time
const observer = new MutationObserver(() => {
  // When page content changes, send updated counts to popup if it's open
  chrome.runtime.sendMessage({
    action: "contentUpdated",
    counts: analyzePage(),
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true,
});
