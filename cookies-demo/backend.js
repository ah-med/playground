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
        console.log('generated sessionId', sessionId);

    res.setHeader(
      "Set-Cookie",
      [
        `sessionId=${sessionId}`,
        "Max-Age=86400", // Set to 24 hours for testing
        "Path=/",
        "SameSite=Strict", // Strict is fine for same-origin testing
        //Note: These settings are not appropriate for production, in production, you should use the following settings:
        /**
         maxAge: 3600000, // 1 hour in milliseconds
        // **Expires**: Set to 1 hour - Balances security and usability.

        httpOnly: true, // Prevents JavaScript access to the cookie.
        // **HttpOnly**: true - Mitigates XSS attacks.

        secure: true, // Ensures the cookie is sent only over HTTPS.
        // **Secure**: true - Prevents exposure over unsecured channels.

        sameSite: 'Lax', // Allows cookies to be sent with same-site requests.
        // **SameSite**: 'Lax' - Enhances CSRF protection while allowing some cross-site use.

        path: '/', // Set the cookie path.
        // **Path**: '/' - Makes the cookie available across the entire application.

        domain: 'example.com' // Set your domain here.
        // **Domain**: 'example.com' - Specifies the domain for which the cookie is valid.
         * 
        */
      ].join("; ")
    );
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
  });
};

const handleGetUser = (req, res) => {
  const unauthorized = () => {
    res.writeHead(401, { 'Content-Type': 'text/plain' });
    res.end('Unauthorized');
  };

  // Extract sessionId from cookies using regex pattern
  const cookies = req.headers?.cookie || "";
  const sessionIdMatch = cookies.match(/sessionId=([^;]+)/);
  const sessionId = sessionIdMatch ? sessionIdMatch[1] : null;

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
  // for localhost testing, allow specific origin
  const origin = 'http://localhost:5000';
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Cookie"
  );


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
server.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT}. visit: http://localhost:${PORT}/pages/home.html`
  )
);
