/**
 * 
 * Clark Balagat
 * 301281954
 * Two Movies from 2010-2019
 * Inception(2010) and Interstellar(2014)
 * COMP229-401
 * 
 * @file server.js
 * @description Implements the API endpoints for managing a movie collection.
 * This server uses Express.js and includes personalized movie additions based on a student ID.
 *
 * Endpoints implemented:
 * - GET /api/movies: Retrieve the full list of movies.
 * - GET /api/movies/filter?genre=[genre name]: Retrieve movies by genre match.
 * - GET /api/movies/:id: Retrieve a movie by its index (ID).
 * - POST /api/movies: Add a new movie to the collection.
 * - PUT /api/movies/:id: Update a movie by its index (ID).
 * - DELETE /api/movies/:id: Remove a movie from the collection by its index (ID).
 */

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser'); // Used to parse JSON bodies of incoming requests
const cors = require('cors'); // Used to enable Cross-Origin Resource Sharing

const app = express();
const PORT = 3000; // Define the port for the server to listen on

// Middleware setup
// Enable CORS for all routes, allowing requests from different origins
app.use(cors());
// Use bodyParser to parse JSON bodies from incoming requests.
// This makes request.body available for POST and PUT requests.
app.use(bodyParser.json());

// Initial movie collection (5 movies)
// This array will hold our movie objects.
let movies = [
    { id: 1, title: 'The Shawshank Redemption', genre: 'Drama', year: 1994, director: 'Frank Darabont' },
    { id: 2, title: 'The Godfather', genre: 'Crime', year: 1972, director: 'Francis Ford Coppola' },
    { id: 3, title: 'The Dark Knight', genre: 'Action', year: 2008, director: 'Christopher Nolan' },
    { id: 4, title: 'Pulp Fiction', genre: 'Crime', year: 1994, director: 'Quentin Tarantino' },
    { id: 5, title: 'Forrest Gump', genre: 'Drama', year: 1994, director: 'Robert Zemeckis' }
];

// Personalized movie additions based on Student ID ending in 4 (movies from 2010-2019)
// The project requires adding 2 personalized movies based on the last digit of the student ID.
// Student ID: 301281954, last digit is 4, so movies from 2010-2019 are required.
const personalizedMovies = [
    { id: 6, title: 'Inception', genre: 'Sci-Fi', year: 2010, director: 'Christopher Nolan' },
    { id: 7, title: 'Interstellar', genre: 'Sci-Fi', year: 2014, director: 'Christopher Nolan' }
];

// Add personalized movies to the main movie array
movies = movies.concat(personalizedMovies);

// Helper function to find the next available ID
// This ensures that new movies added via POST request have a unique ID.
function getNextId() {
    const maxId = movies.reduce((max, movie) => Math.max(max, movie.id), 0);
    return maxId + 1;
}

// --- API Endpoints Implementation ---

/**
 * @api {get} /api/movies
 * @apiDescription Retrieves the full list of all movies.
 * @apiSuccess {Object[]} movies List of movie objects.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 * { "id": 1, "title": "The Shawshank Redemption", ... },
 * ...
 * ]
 */
app.get('/api/movies', (req, res) => {
    console.log('GET /api/movies - Retrieving all movies.');
    // Respond with the entire movies array.
    res.status(200).json(movies);
});

/**
 * @api {get} /api/movies/filter
 * @apiDescription Retrieves movies by genre match.
 * @apiParam {String} genre The genre to filter movies by (case-insensitive).
 * @apiSuccess {Object[]} movies List of movie objects matching the genre.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * [
 * { "id": 1, "title": "The Shawshank Redemption", "genre": "Drama", ... },
 * ...
 * ]
 * @apiError (400) BadRequest If genre query parameter is missing.
 */
app.get('/api/movies/filter', (req, res) => {
    const genre = req.query.genre;
    console.log(`GET /api/movies/filter?genre=${genre} - Filtering movies by genre.`);

    // Validate if genre query parameter is provided
    if (!genre) {
        return res.status(400).json({ message: 'Genre query parameter is required.' });
    }

    // Filter movies based on the provided genre (case-insensitive)
    const filteredMovies = movies.filter(movie =>
        movie.genre.toLowerCase() === genre.toLowerCase()
    );

    // Respond with the filtered list of movies
    res.status(200).json(filteredMovies);
});

/**
 * @api {get} /api/movies/:id
 * @apiDescription Retrieves a movie by its unique index (ID).
 * @apiParam {Number} id The ID of the movie to retrieve.
 * @apiSuccess {Object} movie The movie object.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * { "id": 1, "title": "The Shawshank Redemption", ... }
 * @apiError (404) NotFound If no movie with the specified ID is found.
 */
app.get('/api/movies/:id', (req, res) => {
    // Parse the ID from the URL parameters. Convert it to a number.
    const id = parseInt(req.params.id);
    console.log(`GET /api/movies/${id} - Retrieving movie by ID.`);

    // Find the movie by its ID in the movies array
    const movie = movies.find(m => m.id === id);

    // If movie is not found, send a 404 Not Found response
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found.' });
    }

    // Respond with the found movie object
    res.status(200).json(movie);
});

/**
 * @api {post} /api/movies
 * @apiDescription Adds a new movie to the collection.
 * @apiBody {String} title The title of the movie.
 * @apiBody {String} genre The genre of the movie.
 * @apiBody {Number} year The release year of the movie.
 * @apiBody {String} director The director of the movie.
 * @apiSuccess {Object} movie The newly added movie object with its assigned ID.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created
 * { "id": 8, "title": "New Movie", ... }
 * @apiError (400) BadRequest If required movie fields are missing.
 */
app.post('/api/movies', (req, res) => {
    // Extract movie details from the request body
    const { title, genre, year, director } = req.body;
    console.log(`POST /api/movies - Adding a new movie: ${title}.`);

    // Validate if all required fields are present
    if (!title || !genre || !year || !director) {
        return res.status(400).json({ message: 'All fields (title, genre, year, director) are required.' });
    }

    // Create a new movie object with a unique ID
    const newMovie = {
        id: getNextId(), // Assign a new unique ID
        title,
        genre,
        year,
        director
    };

    // Add the new movie to the collection
    movies.push(newMovie);

    // Respond with the newly created movie object and 201 Created status
    res.status(201).json(newMovie);
});

/**
 * @api {put} /api/movies/:id
 * @apiDescription Updates an existing movie by its index (ID).
 * @apiParam {Number} id The ID of the movie to update.
 * @apiBody {String} [title] The new title of the movie.
 * @apiBody {String} [genre] The new genre of the movie.
 * @apiBody {Number} [year] The new release year of the movie.
 * @apiBody {String} [director] The new director of the movie.
 * @apiSuccess {Object} movie The updated movie object.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * { "id": 1, "title": "Updated Title", ... }
 * @apiError (400) BadRequest If the request body is empty.
 * @apiError (404) NotFound If no movie with the specified ID is found.
 */
app.put('/api/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`PUT /api/movies/${id} - Updating movie by ID.`);

    // Find the index of the movie to be updated
    const movieIndex = movies.findIndex(m => m.id === id);

    // If movie is not found, send a 404 Not Found response
    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found.' });
    }

    // Check if the request body is empty
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Request body cannot be empty for update.' });
    }

    // Update the movie properties with values from the request body
    // Use Object.assign to merge new properties while keeping existing ones
    movies[movieIndex] = { ...movies[movieIndex], ...req.body };

    // Respond with the updated movie object
    res.status(200).json(movies[movieIndex]);
});

/**
 * @api {delete} /api/movies/:id
 * @apiDescription Removes a movie from the collection by its index (ID).
 * @apiParam {Number} id The ID of the movie to remove.
 * @apiSuccess {Object} message Confirmation message that the movie was deleted.
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * { "message": "Movie deleted successfully." }
 * @apiError (404) NotFound If no movie with the specified ID is found.
 */
app.delete('/api/movies/:id', (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`DELETE /api/movies/${id} - Deleting movie by ID.`);

    // Find the index of the movie to be deleted
    const initialLength = movies.length;
    // Filter out the movie with the matching ID
    movies = movies.filter(m => m.id !== id);

    // If the length hasn't changed, it means no movie was found with that ID
    if (movies.length === initialLength) {
        return res.status(404).json({ message: 'Movie not found.' });
    }

    // Respond with a success message
    res.status(200).json({ message: 'Movie deleted successfully.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('API Endpoints are ready!');
});
