const router = require("express").Router();
const verify = require("../verifyToken");
const {
  createMovie,
  getAllmovies,
  getMovie,
  randomMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies");

//Create movie
router.post("/", verify, createMovie);
// Get all movies
router.get("/", verify, getAllmovies);
// Get
router.get("/find/:id", verify, getMovie);
// Get random movie
router.get("/random", verify, randomMovie);
// Update
router.put("/:id", verify, updateMovie);
// DELETE
router.delete("/:id", verify, deleteMovie);
// Stats

module.exports = router;
