const User = require('../models/User');

exports.addSkill = async (req, res) => {
  const { name, type } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.skills.push({ name, type });
    await user.save();
    res.json(user.skills);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to add skill' });
  }
};

exports.endorseSkill = async (req, res) => {
  const { userId, skillName, credibilityTag } = req.body;
  try {
    const user = await User.findById(userId);
    const skill = user.skills.find(s => s.name === skillName);
    if (!skill) return res.status(404).json({ msg: 'Skill not found' });

    skill.endorsements.push({ endorserId: req.user.id, credibilityTag });
    await user.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to endorse skill' });
  }
};

exports.getUserSkills = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('skills');
    res.json(user.skills);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch skills' });
  }
};
