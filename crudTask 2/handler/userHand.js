const userService = require('../service/userService');

const createUser = async (req, res) => {
    //console.log('Request Body:', req.body);  
    try {
      const user = await userService.createUser(req.body);
      res.writeHead(201, { 'Content-Type': 'application/json' }); 
      res.end(JSON.stringify(user));
    } catch (error) {
      console.error('CreateUser Failed:', error);  
      res.writeHead(500, { 'Content-Type': 'application/json' }); 
      res.end(JSON.stringify({ error: error.message }));
    }
  };

  const getAllUsers = async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(users));
    } catch (error) {
      console.error('GetAllUsers Failed:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  };

  const getUserById = async (req, res) => {
    try {
      const pathSegments = req.url.split('/'); 
      const ID = parseInt(pathSegments[pathSegments.length - 1]); 
      //console.log('Extracted ID:', ID);  

      if (isNaN(ID)) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid user ID' }));
        return;
      }
  
      const user = await userService.getUserById(ID); 
  
      if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
      }
  
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } catch (error) {
      console.error('GetUserByID Failed:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  };
  

  const updateUser = async (req, res) => {
    try {
      const updatedUser = await userService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
    } catch (error) {
      console.error('UpdateUser Failed:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  };

  const deleteUser = async (req, res) => {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      if (!deletedUser) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User not found' }));
        return;
      }
      res.writeHead(204);  
      res.end();  
    } catch (error) {
      console.error('DeleteUser Failed:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    }
  };

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
