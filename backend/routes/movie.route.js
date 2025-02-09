import express from 'express';
import { getMovieDetails, getMoviesByCategory, getMovieTrailers, getSimilarMovies, getTrendingMovie } from '../controllers/movie.controller.js';

const router = express.Router();

router.get("/trending", getTrendingMovie); // When the user sends a GET request to /api/v1/movie/trending, the getTrendingMovies function will be called
                                            //only one trending movie each time will be called in the background
router.get("/:id/trailers", getMovieTrailers); // When the user sends a GET request to /api/v1/movie/:id/trailers, the getMovieTrailers function will be called
router.get("/:id/details", getMovieDetails); // When the user sends a GET request to /api/v1/movie/details, the getMovieDetails function will be called
router.get("/:id/similar", getSimilarMovies); // When the user sends a GET request to /api/v1/movie/similar, the getSimilarMovies function will be called
router.get("/:category", getMoviesByCategory);// When the user sends a GET request to /api/v1/movie/:category, the getMoviesByCategory function will be called

export default router; // Export the router object so that it can be used in other files