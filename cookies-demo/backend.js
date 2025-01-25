const http = require('http');
const fs = require('fs');
const path = require('node:path');

// a Map to store user sessions
const userSessions = new Map();


// a function to generate a random sessionId
const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const handlePages = (req, res) => {
    const filePath = path.join(__dirname, req.url.substring(1));
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        } else {
            res.end(data);
        }
    });
}

const handleLogin = (req, res) => {
    let rawBody = '';

    req.on('data', (chunk) => {
        rawBody += chunk;
    });

    req.on('end', () => {
        const body = JSON.parse(rawBody);
        const sessionId = generateSessionId();
        const session = {
            ...body,
            sessionId
        }

        userSessions.set(sessionId, session);
        console.log('sessionId', sessionId);

        res.setHeader('Set-Cookie', [
            `sessionId=${sessionId}`, // Name and value
            //'Expires=Wed, 21 Oct 2025 07:28:00 GMT', // Expiration date
            'Max-Age=360', // Maximum age in seconds
            // 'Domain=127.0.0.1:6600', // Domain
            // 'Path=/', // Path
            // 'Secure', // Secure flag
            // 'HttpOnly', // HttpOnly flag
            'SameSite=None' // SameSite attribute
          ].join('; '));
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('OK');
    });
}

const handleGetUser = (req, res) => {
    // get sessionId from cookies
    const unauthorized = () => {
        res.writeHead(401, {'Content-Type': 'text/plain'});
        res.end('Unauthorized');
    }
    const sessionId = req.headers?.cookie?.split('=')[1];
    if (!sessionId) {
        unauthorized();
        return;
    }

    const session = userSessions.get(sessionId);
    if (!session) {
        // if there was sessionId but no session, delete the sessionId cookie
        // Note: session is in-memory, it refreshes when the server restarts
        res.setHeader('Set-Cookie', [`sessionId=; Max-Age=0`]);
        unauthorized();
        return;
    } else {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
            name: session.name,
            email: session.email,
        }));
    }
}

const handleLogout = (req, res) => {
    // delete the sessionId cookie
    res.setHeader('Set-Cookie', [`sessionId=; Max-Age=0`]);
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('OK');
}

const server = http.createServer((req, res) => {
    // allow cors
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // logRequest
    console.table({
        'request url': req.url,
        'request method': req.method,
        'request cookies': req.headers.cookie,
    });

    // handle routes
    if (req.url === '/login' && req.method === 'POST') {
        handleLogin(req, res);
    } else if (req.url === '/user' && req.method === 'GET') {
        handleGetUser(req, res);
    } else if (req.url === '/logout' && req.method === 'POST') {
        handleLogout(req, res);
    } else if (req.url.startsWith('/pages/') && req.method === 'GET') {
        handlePages(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        console.log('404 Not Found');
    }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
