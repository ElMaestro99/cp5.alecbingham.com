const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const memeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  path: String,
  title: String,
  tag1: Boolean,
  tag2: Boolean,
  tag3: Boolean,
  tag4: Boolean,
  tag5: Boolean,
  tag6: Boolean,
  tag7: Boolean,
  created: {
    type: Date,
    default: Date.now
  },
});

const Meme = mongoose.model('Meme', memeSchema);

// upload meme
router.post("/", validUser, upload.single('meme'), async (req, res) => {
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

  const meme = new Meme({
    user: req.user,
    path: "/images/" + req.file.filename,
    title: req.body.title,
    tag1: req.body.tag1,
    tag2: req.body.tag2,
    tag3: req.body.tag3,
    tag4: req.body.tag4,
    tag5: req.body.tag5,
    tag6: req.body.tag6,
    tag7: req.body.tag7,
  });
  try {
    await meme.save();
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
});

// get the memes of a user
router.get("/", validUser, async (req, res) => {
  try {
    let photos = await Meme.find({
      user: req.user
    }).sort({
      created: -1
    }).populate('user');
    return res.send(photos);
  } catch (error) {
    return res.sendStatus(500);
  }
});

// get all memes for public view
router.get("/all", async (req, res) => {
  try {
    let photos = await Meme.find().sort({
      created: -1
    }).populate('user');
    return res.send(photos);
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let photo = await Meme.findOne({
      _id: req.params.id
    }).populate('user');
    res.send(photo);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/:id", validUser, async (req, res) => {
  try {
    await Meme.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.put("/:id", validUser, async (req, res) => {
  try {
    let meme = await Meme.findOne({_id: req.params.id});
    meme.title = req.body.title;
    meme.save();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = {
  model: Meme,
  routes: router,
}
