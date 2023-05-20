const routes = require('express').Router();
const usersController = require('../controllers/users');

routes.get('/', usersController.getAllUsers);
routes.post('/', usersController.createUser);

module.exports = routes;