const Comic = require('../models/comicModel');

// Get all comics
const getAllComics = async (req, res) => {
  try {
    const comics = await Comic.getAllComics();
    res.json(comics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a comic by ID
const getComicById = async (req, res) => {
  try {
    const comic = await Comic.getComicById(parseInt(req.params.id));
    if (comic) {
      res.json(comic);
    } else {
      res.status(404).json({ message: 'Comic not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new comic
const addComic = async (req, res) => {
  try {
    const newComic = await Comic.addComic(req.body);
    res.json(newComic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add multiple comics (bulk insert)
const addComicsBulk = async (req, res) => {
    try {
      const newComics = await Comic.addComicsBulk(req.body);
      res.json(newComics);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Update an existing comic
const updateComic = async (req, res) => {
  try {
    const updatedComic = await Comic.updateComic(parseInt(req.params.id), req.body);
    if (updatedComic) {
      res.json(updatedComic);
    } else {
      res.status(404).json({ message: 'Comic not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a comic
const deleteComic = async (req, res) => {
  try {
    const deletedComic = await Comic.deleteComic(parseInt(req.params.id));
    if (deletedComic) {
      res.json({ message: 'Comic deleted', deletedComic });
    } else {
      res.status(404).json({ message: 'Comic not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllComics,
  getComicById,
  addComic,
  addComicsBulk,
  updateComic,
  deleteComic
};
