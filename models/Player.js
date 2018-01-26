const mongoose = require('mongoose');
const { Schema } = mongoose;

const playerSchema = new Schema({
  displayName: String,
  _id: String,
  score: { type: Number, default: 0 }
});

module.exports = playerSchema;
