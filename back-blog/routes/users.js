
var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', userController.getUsers);

/* GET user. */
router.get('/:id', userController.getUserById);

/* Post user. */
router.post('/',  userController.createUser);

/* update user */
router.put('/:id', userController.updateUser);

module.exports = router;
