const express = require('express');
const comicController = require('../controllers/comicController');
const router = express.Router();

// Define routes
router.get('/', comicController.getAllComics);
router.get('/:id', comicController.getComicById);
router.post('/', comicController.addComic);
router.post('/bulk', comicController.addComicsBulk); 
router.put('/:id', comicController.updateComic);
router.delete('/:id', comicController.deleteComic);

module.exports = router;
