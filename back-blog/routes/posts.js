
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const postController = require('../controllers/postController');
const passport = require('passport');

/* GET users listing. */
router.get('/', postController.getPosts);
/* GET user. */
router.get('/:id', postController.getPostById);

/* Post user. */
router.post('/', passport.authenticate("jwt", {session: false}), postController.createPost);

/* update user */
router.put('/:id', postController.updatePost);


module.exports = router;
