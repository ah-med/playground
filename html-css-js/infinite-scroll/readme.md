# Infinite Scroll

## How to implement infinite scroll

1. Use a scroll event listener to detect when the user scrolls to the bottom of the page
   - Use `window.addEventListener('scroll', () => { ... })`
   - Use `window.innerHeight + window.scrollY >= document.documentElement.scrollHeight` to detect when the user has scrolled to the bottom of the page
   - what is `window.innerHeight`?
     - it is the height of the viewport 
     - what is viewport?
       - it is the visible area of a web page
     - what is `window.scrollY`?
       - it is the number of pixels that the document is scrolled vertically
     - what is `document.documentElement.scrollHeight`?
       - it is the height of the entire document
2. Fetch more data from the server
3. Append the new data to the page
4. Repeat


