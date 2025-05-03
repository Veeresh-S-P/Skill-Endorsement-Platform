const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile,getAllUsers} = require('../controllers/userController');
const auth = require('../middleware/auth');



router.get('/', getAllUsers)
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:userId', auth, getUserProfile);

module.exports = router;
