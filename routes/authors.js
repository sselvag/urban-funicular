const express = require('express');
const router = express.Router();
const Author = require('../models/author');

router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getAuthor, (req, res) => {
  res.status(200).json(res.author);
});

router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
    listOfBooks: req.body.listOfBooks,
    briefBiography: req.body.briefBiography,
  });
  try {
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id', getAuthor, async (req, res) => {
  if (req.body.name != null) {
    res.author.name = req.body.name;
  }
  if (req.body.listOfBooks != null) {
    res.author.listOfBooks = req.body.listOfBooks;
  }
  if (req.body.briefBiography != null) {
    res.author.briefBiography = req.body.briefBiography;
  }
  try {
    const updatedAuthor = await res.author.save();
    res.status(200).json(updatedAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getAuthor, async (req, res) => {
  try {
    await res.author.deleteOne();
    res.status(200).json({ message: 'Author deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getAuthor(req, res, next) {
  let author;
  try {
    author = await Author.findById(req.params.id);
    if (author == null) {
      return res.status(404).json({ message: 'Cannot find author' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.author = author;
  next();
}

module.exports = router;