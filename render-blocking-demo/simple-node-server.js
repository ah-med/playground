const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/script.js') {
        // Set the content type header for JavaScript
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        setTimeout(() => {
            // The JavaScript content we want to serve
            const scriptContent = `
            console.log("This script was loaded from the server!");
            document.getElementById("script-status").innerHTML = "Script loaded from the server";
        `;
        
        res.end(scriptContent);
        }, 10000);
    } else {
        // Handle other routes with a 404
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = 3500;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
