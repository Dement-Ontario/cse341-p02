const routes = require('express').Router();
const { userValidation } = require('../validation');
const usersController = require('../controllers/users');

routes.get('/', usersController.getAllUsers);
routes.get('/:id', usersController.getOneUser);

routes.post('/', userValidation, usersController.createUser);
routes.put('/:id', userValidation, usersController.updateUser);
routes.delete('/:id', usersController.deleteUser);

module.exports = routes;