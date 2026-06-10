// Minimal static server for Railway. Zero dependencies.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const ROOT = __dirname;
const INDEX = path.join(ROOT, 'index.html');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.ico':  'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Health check
  if (req.url === '/health' || req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok');
    return;
  }

  // Resolve requested path safely
  const urlPath = decodeURIComponent(req.url.split('?')[0]);
  let filePath = path.normalize(path.join(ROOT, urlPath === '/' ? 'index.html' : urlPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      // Fallback to index for any unknown path
      filePath = INDEX;
    }
    const ext = path.extname(filePath).toLowerCase();
    const ctype = MIME[ext] || 'application/octet-stream';
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(500); res.end('Server error'); return; }
      res.writeHead(200, {
        'Content-Type': ctype,
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`BTC EMA monitor serving on :${PORT}`);
});
