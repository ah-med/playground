# Creating a Chrome Extension

## Overview

A Chrome extension is a software program that customizes the Chrome browsing experience. Extensions are built using web technologies like HTML, CSS, and JavaScript.

## Basic Components

1. **manifest.json** (Required)

   - The configuration file that tells Chrome about your extension
   - Specifies permissions, files, and extension behavior

2. **popup.html** (Optional)

   - The HTML file that appears when users click your extension icon
   - Contains the user interface of your extension

3. **popup.js** (Optional)

   - JavaScript file that handles popup logic
   - Interacts with the popup.html

4. **content.js** (Optional)

   - Scripts that run in the context of web pages
   - Can modify web page content

5. **background.js** (Optional)
   - Handles extension events and browser interactions
   - Runs in the background

## Getting Started

1. Create a new directory for your extension
2. Create a `manifest.json` file with basic configuration:

   ```json
   {
   "manifest_version": 3,
   "name": "My First Extension",
   "version": "1.0",
   "description": "A basic Chrome extension",
   "action": {
   "default_popup": "popup.html"
   }

   ```

## Loading Your Extension

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select your extension directory

## Common Permissions

- `"tabs"`: Access browser tabs
- `"storage"`: Use Chrome storage API
- `"activeTab"`: Access the current tab
- `"scripting"`: Inject scripts into web pages

## Best Practices

1. Keep permissions minimal
2. Use Manifest V3 (latest version)
3. Follow Chrome's security guidelines
4. Test thoroughly before publishing

## Publishing

1. Create a developer account on Chrome Web Store
2. Package your extension
3. Submit for review
4. Pay one-time developer fee ($5)

## Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [Chrome Web Store](https://chrome.google.com/webstore/category/extensions)
- [Sample Extensions](https://github.com/GoogleChrome/chrome-extensions-samples)

## Practice Projects

### Beginner Level

1. **Page Word Counter**
   - [Page Word Counter](page-word-counter/README.md)
   - Counts words and characters on the current page
   - Teaches: content scripts, DOM manipulation
   - Key files: [manifest.json](page-word-counter/manifest.json), [popup.html](page-word-counter/popup/popup.html), [content.js](page-word-counter/content/content.js)

2. **Tab Manager**

   - Lists all open tabs and allows closing them
   - Teaches: tabs API, basic UI interaction
   - Key files: manifest.json, popup.html, popup.js

3. **Bookmark Saver**
   - Saves current page to bookmarks with one click
   - Teaches: bookmarks API, browser actions
   - Key files: manifest.json, popup.html, background.js

### Intermediate Level

1. **Theme Switcher**

   - Toggles dark/light mode on websites
   - Teaches: CSS injection, storage API
   - Key files: manifest.json, content.js, storage handling

2. **Screenshot Capture**

   - Captures visible page or selected area
   - Teaches: chrome.tabs API, canvas manipulation
   - Key files: manifest.json, popup.html, background.js

3. **Reading Time Estimator**
   - Shows estimated reading time for articles
   - Teaches: content analysis, text processing
   - Key files: manifest.json, content.js, algorithm implementation

### Advanced Level

1. **Web Scraper**

   - Extracts specific data from web pages
   - Teaches: advanced DOM manipulation, data processing
   - Key files: manifest.json, content.js, background.js, storage

2. **Page Translator**

   - Translates selected text using external APIs
   - Teaches: API integration, context menus
   - Key files: manifest.json, background.js, content.js

3. **Productivity Timer**
   - Pomodoro timer with website blocking
   - Teaches: alarms API, website filtering
   - Key files: manifest.json, background.js, popup.html, storage


