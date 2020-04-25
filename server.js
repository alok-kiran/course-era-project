const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const data = require('./src/db.json');
app.use((req, res, next) => {
  console.log('Request for ', req.url);
  next();
})

app.use(bodyParser.json());

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.post('/comments', (req, res) => {
  const comments = req.body;
  data.comments.push(comments);
  res.send(data.comments).status(200);
});

app.post('/feedback', (req, res) => {
  const feedback = req.body;
  data.feedback.push(feedback);
  res.send(data.feedback).status(200);
});

app.get('/dishes', (req, res) => {
  res.json(data.dishes).status(200);
});

app.get('/comments', (req, res) => {
  res.send(data.comments).status(200);
});

app.get('/promotions', (req, res) => {
  res.send(data.promotions).status(200);
});

app.get('/leaders', (req, res) => {
  res.send(data.leaders).status(200);
});
app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`> Server running on PORT ${process.env.PORT || 3001}`)
});
