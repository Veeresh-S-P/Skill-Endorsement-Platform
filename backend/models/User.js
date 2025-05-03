const mongoose = require('mongoose');

const endorsementSchema = new mongoose.Schema({
  endorserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  credibilityTag: String,
});

const skillSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['soft', 'technical'] },
  endorsements: [endorsementSchema],
});

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  skills: [skillSchema],
});

module.exports = mongoose.model('User', userSchema);
