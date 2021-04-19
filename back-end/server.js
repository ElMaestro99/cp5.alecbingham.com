const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/cp5', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// import the users module and setup its API path
const users = require("./users.js");
app.use("/api/users", users.routes);

const memes = require("./memes.js");
app.use("/api/memes", memes.routes);

const comments = require("./comments.js");
app.use("/api/comments", comments.routes);

app.listen(8001, () => console.log('Server listening on port 8001!'));
