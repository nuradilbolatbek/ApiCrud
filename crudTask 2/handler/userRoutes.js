// Функция для обработки запросов
const url = require('url');

const userRoutes = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method;
    const path = parsedUrl.pathname;
    const contrl = require('./userHand');
  
    res.setHeader('Content-Type', 'application/json');
  
    if (method === 'GET' && path === '/users') {
        contrl.getAllUsers(req, res);
    } else if (method === 'POST' && path === '/users') {
        contrl.createUser(req, res);
    } else if (method === 'GET' && path.match(/^\/users\/\d+$/)) {
        const userID = parseInt(path.split('/')[2]);
        contrl.getUserById(req, res, userID);
    } else if (method === 'PUT' && path.match(/^\/users\/\d+$/)) {
        const userID = parseInt(path.split('/')[2]);
        contrl.updateUser(req, res, userID);
    } else if (method === 'DELETE' && path.match(/^\/users\/\d+$/)) {
        const userID = parseInt(path.split('/')[2]);
        contrl.deleteUser(req, res, userID);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
  };
  
  module.exports = userRoutes;
  