const express = require('express');
const {
    registerUser,
    loginUser,
    getUserProfile,
} = require('../controller.js/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);

module.exports = router;
