const routes = require('express').Router();
const usersController = require('../controllers/main');

routes.get('/', usersController.main);
routes.use('/users', require('./users'));

module.exports = routes;