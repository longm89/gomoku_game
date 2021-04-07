const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));
const Scores = require('./models/score');
const PORT = process.env.PORT || 3001;

app.get('/api/scores', (request, response) => {
  Scores.find({}).then(scores => {
    response.json(scores);
  });

});

app.put('/api/scores/humanScore', (request, response) => {
  const scoreToAdd = request.body.score;
  Scores.find({})
    .then(scores => scores[0])
    .then(scores => {
      const newScores = {
        humanScore: scores.humanScore + scoreToAdd,
        computerScore: scores.computerScore
      };
      Scores.findOneAndUpdate({}, newScores, { new: true }).then(scores => {
        response.json(scores);
      });
    });
});

app.put('/api/scores/computerScore', (request, response) => {
  const scoreToAdd = request.body.score;
  Scores.find({})
    .then(scores => scores[0])
    .then(scores => {
      const newScores = {
        humanScore: scores.humanScore,
        computerScore: scores.computerScore + scoreToAdd
      };
      Scores.findOneAndUpdate({}, newScores, { new: true }).then(scores => {
        response.json(scores);
      });
    });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});