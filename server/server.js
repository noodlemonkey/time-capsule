const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const messageController = require('./messageController.js');

app.use(bodyParser.json());

app.post('/send', messageController.storeMessage, (req, res) => {});

app.get('/check', messageController.sendMessage, (req, res) => {
  if (res.locals.message) {
    res.json(res.locals.message);
  }
});

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(404).send('Whoops');
});

app.listen(3000);
