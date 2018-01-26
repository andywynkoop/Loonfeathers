const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  displayName: String,
  latest: { type: String, default: '' }
});

mongoose.model('users', userSchema);
