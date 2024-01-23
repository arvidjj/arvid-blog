var express = require('express');
var router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');

router.get("/", (req, res) => {
  res.json({ name: "frodo" });
});

router.get("/test", (req, res) => res.json({ array }));

router.post("/test", (req, res) => {
  array.push(req.body.item);
  res.send('success!');
});

router.post('/login', authController.login);

router.post('/logout', authController.logout)

module.exports = router;
