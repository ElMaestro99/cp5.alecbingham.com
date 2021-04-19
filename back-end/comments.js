const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const memes = require("./memes.js");
const Meme = memes.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  meme: {
    type: mongoose.Schema.ObjectId,
    ref: "Meme"
  },
  text: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', commentSchema);

router.post("/", validUser, async (req, res) => {
    const comment = new Comment({
    user: req.body.user,
    meme: req.body.meme,
    text: req.body.text,
  });
  try {
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let comments = await Comment.find({
      photo: req.params.id
    }).sort({
      created: -1
    }).populate('user');
    return res.send(comments);
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.delete("/:id", validUser, async (req, res) => {
  try {
    let meme = await Meme.findOne({_id: req.params.id});
    if (!meme) {
      res.send(404);
      return;
    }
    await Comment.deleteMany({
      meme: meme
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = {
  model: Comment,
  routes: router,
}
