const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');  // Import Morgan
const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


// Path to the JSON file
const comicsFile = '../comics-api/data/comics.json';

// Helper function to read JSON file
const readComics = () => {
  const data = fs.readFileSync(comicsFile);
  return JSON.parse(data);
};

// Helper function to write to JSON file
const writeComics = (comics) => {
  fs.writeFileSync(comicsFile, JSON.stringify(comics, null, 2));
};

// GET: Fetch all comics
app.get('/comics', (req, res) => {
  const comics = readComics();
  res.json(comics);
});

// POST: Add a new comic
app.post('/comics', (req, res) => {
  const comics = readComics();
  const newComic = { id: Date.now(), ...req.body };
  comics.push(newComic);
  writeComics(comics);
  res.json(newComic);
});

// PUT: Edit an existing comic
app.put('/comics/:id', (req, res) => {
  const comics = readComics();
  const comicIndex = comics.findIndex((comic) => comic.id === parseInt(req.params.id));
  
  if (comicIndex !== -1) {
    // Update comic with new data, ensuring `read` is a boolean
    comics[comicIndex] = { id: parseInt(req.params.id), ...req.body };
    writeComics(comics);
    res.json(comics[comicIndex]);
  } else {
    res.status(404).json({ message: "Comic not found" });
  }
});

// DELETE: Delete a comic
app.delete('/comics/:id', (req, res) => {
  const comics = readComics();
  const updatedComics = comics.filter((comic) => comic.id !== parseInt(req.params.id));
  writeComics(updatedComics);
  res.json({ message: "Comic deleted" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
