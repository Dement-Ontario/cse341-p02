const routes = require('express').Router();
const { postValidation } = require('../validation');
const postsController = require('../controllers/posts');

routes.get('/', postsController.getAllPosts);
routes.get('/from/:id', postsController.getUserPosts);
routes.get('/:id', postsController.getOnePost);

// Planning to add these later
// routes.post('/', postValidation, postsController.createPost);
// routes.put('/:id', postValidation, postsController.editPost);
// routes.delete('/:id', postsController.deletePost);

module.exports = routes;