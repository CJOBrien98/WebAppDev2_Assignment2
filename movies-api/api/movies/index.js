import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies } from '../tmdb-api';
import { getGenres } from '../tmdb-api';
import { getMovieImages } from '../tmdb-api';
import { getMovie } from '../tmdb-api';
import { getMovies } from '../tmdb-api';
import { getMovieReviews } from '../tmdb-api';
import { getNowPlayingMovies } from '../tmdb-api';
import { getPopularMovies } from '../tmdb-api';
import { getRecommended } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({ message: 'The movie you requested could not be found.', status_code: 404 });
    }
}));

router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/tmdb/movies', asyncHandler(async (req, res) => {
    const movies = await getMovies();
    res.status(200).json(movies);
}));

router.get('/tmdb/:id/images', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movieImages = await getMovieImages({ queryKey: [null, { id }] });
    res.status(200).json(movieImages);
}));

router.get('/tmdb/movies/:id/reviews', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const movieReviews = await getMovieReviews({ queryKey: [null, { id }] });
    res.status(200).json(movieReviews);
}));

router.get('/tmdb/now_playing', asyncHandler(async (req, res) => {
    const nowPlayingMovies = await getNowPlayingMovies();
    res.status(200).json(nowPlayingMovies);
}));

router.get('/tmdb/popular', asyncHandler(async (req, res) => {
    const popularMovies = await getPopularMovies();
    res.status(200).json(popularMovies);
}));

router.get('/tmdb/movies/:id/recommended', asyncHandler(async (req, res) => {
    const { id } = req.params;
    const recommendedMovies = await getRecommended({ queryKey: [null, { id }] });
    res.status(200).json(recommendedMovies);
}));

router.get('/tmdb/movies/:id', asyncHandler(async (req, res) => {
    const { id } = req.params;
    //console.log(id)
    const movie = await getMovie({ queryKey: [null, { id }] });
    res.status(200).json(movie);
}));

export default router;