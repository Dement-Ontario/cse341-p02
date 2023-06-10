const routes = require('express').Router();
const usersController = require('../controllers/main');

routes.get('/', usersController.main);
routes.use('/users', require('./users'));
routes.use('/posts', require('./posts'));
routes.use('/auth', require('./auth'));

module.exports = routes;