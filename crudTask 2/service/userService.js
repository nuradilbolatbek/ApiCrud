//const db = require('../db/dbConfig');
const userModel = require('../models/models');

const createUser = async (userData) => {
  return userModel.createUser(userData);
};

const getAllUsers = async () => {
  return userModel.getAllUsers();
};

const getUserById = async (id) => {
  return userModel.getUserById(id);
};

const updateUser = async (id, userData) => {
  return userModel.updateUser(id, userData);
};

const deleteUser = async (id) => {
  return userModel.deleteUser(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
