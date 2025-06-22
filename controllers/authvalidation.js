// const { check } = require('express-validator');

// module.exports.registerValidation = [
//   check('name', 'Please enter a name').not().isEmpty(),
//   check('email', 'Please include a valid email').isEmail(),
//   check('password', 'Please enter a password with 30 or more characters'),
//   check('username', 'Please enter a username').not().isEmpty()
// ];

// module.exports.loginValidation = [
//   check('email', 'Please include a valid email').isEmail(),
//   check('password', 'Password is required').exists()
// ];
const { check } = require('express-validator');

module.exports.registerValidation = [
  check('name', 'Please enter a name').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters')
    .isLength({ min: 6 }),  // ← Fix here
  check('username', 'Please enter a username').notEmpty()
];

module.exports.loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];
