const express = require('express');
const router = express.Router();

const Movie = require('../schemas/movie'); 
const { error } = require('jquery');


router.post("/", async (req, res) => {

  console.log('yaman');
  try {
    const newMovie = new Movie({
      title: req.body.title,
      director: req.body.director,
      releaseYear: req.body.releaseYear,
      genre: req.body.genre,
      rate: req.body.rate
    }); 

    




    const savedMovie = await newMovie.save(); 
    res.status(201).json(savedMovie);

    
  } catch (err) {

    
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
})
// Read all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find(); 
    res.json(movies);

    
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; 
    

    console.log("yaman");
    const updateMovieData = {
      title: req.body.title, 
      director: req.body.director,
      releaseYear: req.body.releaseYear,
      genre: req.body.genre,
      rate: req.body.rate
    };

    console.log(updateMovieData);
   
    const updatedMovie = await Movie.findByIdAndUpdate(id, updateMovieData, { new: true });

    if (!updatedMovie) {
      return res.status(404).send('Movie not found');
    }

    res.json({ message: 'Movie updated successfully', updatedMovie });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});






// Delete a movie by ID
router.delete("/:id", async (req, res) => {
  try {


    const deletedMovie = await Movie.findByIdAndDelete(req.params.id); 
    if (!deletedMovie) {
      res.status(404).send('Movie not found');
    } else {
      res.json({ message: 'Movie deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

