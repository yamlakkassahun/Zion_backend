const express = require('express');
const router = express.Router();
const Authenticate = require('../middleware/AuthMiddleware');
//controller
const { AdminSignUp, AdminLogin } = require('../controllers/adminController');

/* GET users listing. */
// router.get('/', function(req, res, next) {res.json('hello from admin Router');});

router.post('/signup', AdminSignUp );
router.post('/login', AdminLogin );

// router.use(Authenticate);

router.get('/', function(req, res, next) {res.json('hello from admin Router');});
module.exports = router;