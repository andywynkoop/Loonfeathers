const mongoose = require('mongoose');
const { Schema } = mongoose;
const PlayerSchema = require('./Player');
const SubmissionSchema = require('./Submission');

const gameSchema = new Schema({
  name: String,
  players: [PlayerSchema],
  round: { type: Number, default: 1 },
  joinable: { type: Boolean, default: true },
  manager: PlayerSchema,
  topic: String,
  guesser: PlayerSchema,
  submissions: [SubmissionSchema],
  latestNews: { type: String, default: '' },
  creationDate: Date,
  lastPlayed: Date
});

mongoose.model('games', gameSchema);
