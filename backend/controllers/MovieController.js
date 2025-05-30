import Movie from "../models/MovieModel.js";

export const getMovies = async (req, res) => {
  try {
    const response = await Movie.findAll();
    res.status(200).json(response);
    } catch (error) {
        console.log(error.massage);
    }
}

export const getMoviebyId = async (req, res) => {
  try {
    const response = await Movie.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(response);
    } catch (error) {
        console.log(error.massage);
    }
}

export const createMovie = async (req, res) => {
  try {
    // Check if movie already exists
    const existingMovie = await Movie.findOne({ 
      where: { name: req.body.name } 
    });
    
    if (existingMovie) {
      return res.status(400).json({ 
        message: "Movie with this name already exists!" 
      });
    }

    await Movie.create(req.body);
    res.status(201).json({ message: "Movie created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateMovie = async (req, res) => {
  try {
    await Movie.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({msg: "Movie Updated"});
    } catch (error) {
        console.log(error.massage);
    }
}

export const deleteMovie = async (req, res) => {
  try {
    await Movie.destroy({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({msg: "Movie Deleted"});
    } catch (error) {
        console.log(error.massage);
    }
}