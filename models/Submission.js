const mongoose = require('mongoose');
const { Schema } = mongoose;

const submissionSchema = new Schema({
  playerId: String,
  content: String
});

