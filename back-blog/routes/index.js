var express = require('express');
var router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', authController.login);

module.exports = router;
