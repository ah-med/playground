document.addEventListener("DOMContentLoaded", () => {
  const wordCount = document.getElementById("wordCount");
  const charCountWithSpaces = document.getElementById("charCountWithSpaces");
  const charCountNoSpaces = document.getElementById("charCountNoSpaces");
  const lastUpdated = document.getElementById("lastUpdated");

  function updateDisplay(counts) {
    wordCount.textContent = counts.wordCount.toLocaleString();
    charCountWithSpaces.textContent =
      counts.charCountWithSpaces.toLocaleString();
    charCountNoSpaces.textContent =
      counts.charCountWithoutSpaces.toLocaleString();
    lastUpdated.textContent = new Date().toLocaleTimeString();
  }

  function requestCounts() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { action: "getCount" },
          (response) => {
            if (response) {
              updateDisplay(response);
            } else {
              const errorMessage = chrome.runtime.lastError
                ? chrome.runtime.lastError.message
                : "No response from page";

              document.getElementById("error").textContent =
                "Error: " + errorMessage;
            }
          }
        );
      }
    });
  }

  // Listen for real-time updates from content script
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "contentUpdated") {
      updateDisplay(message.counts);
    }
  });

  // Add refresh button functionality
  document
    .getElementById("refreshButton")
    .addEventListener("click", requestCounts);

  // Initial request for counts when popup opens
  requestCounts();
});

// error handling for when the popup can't connect to the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.error) {
    document.getElementById("error").textContent = "Error: " + message.error;
  }
  return true;
});
