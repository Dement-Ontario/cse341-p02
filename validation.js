const { check } = require('express-validator');
 
exports.userValidation = [
    check('username', 'Username is required').not().isEmpty(),
    check('displayname').optional(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    check('password', 'Password is required').not().isEmpty(),
    check('birthday', 'Please make a birthday in MM/DD/YYYY format').matches(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/),
    check('description').optional()
]