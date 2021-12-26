const Movie = require("../models/Movie");

const createMovie = async (req, res, next) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(200).json(savedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Not allowed to create a movie");
  }
};
const getAllmovies = async (req, res, next) => {
    try {
        const movies = await Movie.find()
        res.status(200).json(movies) 
      } catch (err) {
        res.status(500).json(err)
      }
}
const getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
      } catch (err) {
        res.status(500).json(err);
      }
}
//Random Movie or serie
const randomMovie = async (req, res) => {
    const type = req.params.type;
    let video;
    try {
      if (type === "series") {
        video = await Movie.aggregate([{ $match: { isSeries: true } }, { $sample: { size: 1 } }])
          
      } else {
        video = await Movie.aggregate([{ $match: { isSeries: false } }, { $sample: { size: 1 } }])
      }
      res.status(200).json(video);
    } catch (err) {
      res.status(500).json(err);
    }
}

//Update movie 
const updateMovie = async (req, res) => {
    if (req.user.isAdmin) {
        try {
          const newMovieData = new Movie.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
          );
          res.status(200).json(newMovieData);
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        res.status(403).json("Not allowed to update a movie");
      }
}

// Delete movie
const deleteMovie = async (req, res) => {
    if (req.user.isAdmin) {
        try {
          await Movie.findByIdAndDelete(req.params.id);
          res.status(200).json("The movie was successfull deleted");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(500).json("Not allowed to delete movies >:(");
      }
}
module.exports = { createMovie, getAllmovies, getMovie, randomMovie, updateMovie, deleteMovie };
