const routes = require('express').Router();
const authController = require('../controllers/auth');

routes.get('/', authController.authRedirect);
routes.get('/callback', authController.authCallback);

module.exports = routes;