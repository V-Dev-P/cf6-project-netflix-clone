import express from 'express';
import { getSimilarTvs, getTrendingTv, getTvDetails, getTvsByCategory, getTvTrailers } from '../controllers/tv.controller.js';

const router = express.Router();

router.get("/trending", getTrendingTv); // When the user sends a GET request to /api/v1/tv/trending, the getTrendingTv function will be called
                                            //only one trending series each time will be called in the background
router.get("/:id/trailers", getTvTrailers); // When the user sends a GET request to /api/v1/tv/:id/trailers, the getTvTrailers function will be called
router.get("/:id/details", getTvDetails); // When the user sends a GET request to /api/v1/tv/details, the getTvDetails function will be called
router.get("/:id/similar", getSimilarTvs); // When the user sends a GET request to /api/v1/tv/similar, the getSimilarTvs function will be called
router.get("/:category", getTvsByCategory);// When the user sends a GET request to /api/v1/tv/:category, the getTvsByCategory function will be called

export default router;