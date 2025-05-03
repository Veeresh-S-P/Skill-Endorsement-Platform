const express = require('express');
const router = express.Router();
const { addSkill, endorseSkill, getUserSkills } = require('../controllers/skillController');
const auth = require('../middleware/auth');

router.post('/add', auth, addSkill);
router.post('/endorse', auth, endorseSkill);
router.get('/:userId', auth, getUserSkills);

module.exports = router;
