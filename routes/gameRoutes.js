const mongoose = require('mongoose');
const Game = mongoose.model('games');

module.exports = app => {
  app.get('/api/game', (req, res) => {
    Game.find((err, games) => {
      if (err) {
        console.log(err);
      } else {
        res.json(games);
      }
    });
  });

  app.post('/api/game', (req, res) => {
    const { name, displayName, _id } = req.body;
    console.log(name, displayName, _id);
    let manager = { displayName, _id };
    let game = new Game({
      name,
      players: [manager],
      manager,
      guesser: manager,
      creationDate: Date.now(),
      lastPlayed: Date.now()
    });
    let { user } = req;
    user.latest = name;
    user.save();
    game.save();
    res.send(game);
  });

  app.get('/api/game/status', (req, res) => {
    const { id } = req.query;
    Game.findOne({ name: id }, (err, game) => {
      if (err) {
        console.log(err);
      } else {
        res.json(game);
      }
    });
  });

  app.post('/api/game/join', async (req, res) => {
    const { name } = req.body;
    console.log(name);
    req.user.latest = name;
    const user = await req.user.save();
    let game = await Game.findOne({ name });
    const { displayName, googleId } = user;
    if (!game.players.find(player => player._id === googleId)) {
      let player = { displayName, _id: googleId };
      game.players.push(player);
      game.lastPlayed = Date.now();
      await game.save();
    }
    res.send(user);
  });

  app.post('/api/game/topic', async (req, res) => {
    const { _id, topic } = req.body;
    let game = await Game.findOne({ _id });
    game.topic = topic;
    game.lastPlayed = Date.now();
    game.save();
    res.send(game);
  });

  app.post('/api/game/submit', async (req, res) => {
    const { _id, submission } = req.body;
    let game = await Game.findOne({ _id });
    if (!game.submissions.find(sub => sub.playerId == submission.playerId)) {
      game.submissions.push(submission);
      game.lastPlayed = Date.now();
    }
    game.save();
  });

  app.post('/api/game/close', async (req, res) => {
    const { _id } = req.body;
    let game = await Game.findOne({ _id });
    game.joinable = false;
    game.lastPlayed = Date.now();
    game.save();
    res.send(game);
  });

  app.post('/api/game/correct', async (req, res) => {
    const { _id, submission, guesser } = req.body;
    let game = await Game.findOne({ _id });
    let { submissions } = game;
    submissions = submissions.filter(
      sub => sub.playerId !== submission.playerId
    );
    game.submissions = submissions;
    game.latestNews = `${guesser.displayName} guessed correctly!`;
    game.lastPlayed = Date.now();
    let { players } = game;
    let player = players.find(player => player._id === guesser._id);
    let idx = players.findIndex(player => player._id === guesser._id);
    player.score += 1;
    players[idx] = player;
    game.players = players;
    game.save();
  });

  app.post('/api/game/incorrect', async (req, res) => {
    console.log('I N C O R R E C T');
    const { _id } = req.body;
    let game = await Game.findOne({ _id });
    let { submissions, guesser, players } = game;
    let oldGuesser = guesser.displayName;
    let idx = submissions.findIndex(sub => sub.playerId === guesser._id);
    let length = submissions.length;
    idx = idx + 1;
    if (idx === length) {
      idx = 0;
    }
    let id = submissions[idx].playerId;
    let player = players.find(player => player._id === id);
    game.guesser = player;
    game.latestNews = `${oldGuesser} guessed incorrectly. Booooo! ${
      player.displayName
    }'s turn.`;
    game.lastPlayed = Date.now();
    game.save();
  });

  app.post('/api/game/end', async (req, res) => {
    let { _id } = req.body;
    let game = await Game.findOne({ _id });
    game.manager = game.guesser;
    game.submissions = [];
    game.round = game.round + 1;
    game.joinable = true;
    game.topic = null;
    game.latestNews = '';
    game.lastPlayed = Date.now();
    game.save();
  });
};
