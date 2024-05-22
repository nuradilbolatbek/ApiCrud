const url = require('url');
const userRoutes = require('../handler/userRoutes');


const routeHandler = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    handleRequestData(req, error => {
        if (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON format' }));
            return;
        }
  
    if (path === '/users' || path.startsWith('/users/')) {
      userRoutes(req, res);
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
});
  };
  
  module.exports = routeHandler;

  function handleRequestData(req, callback) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        if (body) {
            try {
                req.body = JSON.parse(body);
            } catch (error) {
                return callback(error);
            }
        }
        const urlParts = new URL(req.url, `http://${req.headers.host}`);
        req.params = {};
        const idMatch = urlParts.pathname.match(/\/users\/(\d+)/);
        if (idMatch) {
            req.params.id = idMatch[1];
        }
        callback(null);
    });
}
