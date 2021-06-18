const express = require('express');
const router = express.Router();

//controller
const { AdminSignUp, AdminLogin } = require('../controllers/adminController');

/* GET users listing. */
router.get('/', function(req, res, next) {res.json('hello from admin Router');});

router.post('/signup', AdminSignUp );
router.post('/login', AdminLogin );

module.exports = router;