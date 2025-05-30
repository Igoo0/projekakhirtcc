import express from "express";
import { 
    getMovies, 
    getMoviebyId,
    createMovie,
    updateMovie,
    deleteMovie
} from "../controllers/MovieController.js";

const router = express.Router();

router.get("/Movies", getMovies);
router.get("/Movies/:id", getMoviebyId);
router.post("/Movies", createMovie);
router.patch("/Movies/:id", updateMovie);
router.delete("/Movies/:id", deleteMovie);

export default router;