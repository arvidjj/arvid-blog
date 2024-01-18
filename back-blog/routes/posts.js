
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const postController = require('../controllers/postController');

/* GET users listing. */
router.get('/', verifyToken, async (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
        if (err) {
            return res.status(403).json({ message: 'Permission denied' });
        }
    });
    postController.getPosts(req, res, next);
});
/* GET user. */
router.get('/:id', postController.getPostById);

/* Post user. */
router.post('/', postController.createPost);

/* update user */
router.put('/:id', postController.updatePost);

// Verify token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


module.exports = router;
