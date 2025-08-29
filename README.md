# Assignment 2 - Web API.

Name: Conor O'Brien

## Features.

 + All traffic from the React App that requires information from TMDB is now routed through the API (both static and param endpoints)

## Setup requirements.

 - Navigate to react-app dir in terminal
 - Run command "npm install --force" as some modules are not updated for the latest version of node
 - Navigate to movies-app dir in terminal
 - Run command "npm install"

## API Configuration

2 .env files are needed containing the following:


Location:/movies-api
______________________
NODEENV=development
PORT=8080
HOST=localhost
mongoDB=YourMongoURL
TMDB_KEY=YourTMDBKey
secret=YourJWTSecret
______________________

Location:/react-movies
______________________
FAST_REFRESH=false
______________________


## API Design

- /api/tmdb/movies | GET | Gets a list of movies 
- /api/tmdb/movies/{id} | GET | Gets a single movie 
- /api/tmdb/movies/{id}/reviews | GET | Get all reviews for movie 
- /api/tmdb/:id/images  | GET | Gets movie images
- /api/tmdb/movies/:id/recommended | GET | Gets a list of recommended movies based on one selected
- /api/tmdb/popular | GET | Gets a list of popular movies
- /api/tmdb/now_playing | GET | Gets a list of movies now playing in cinemas
- /api/tmdb/genres | GET | Gets a list of movie genres
- /api/tmdb/upcoming | GET | Gets a list of upcoming movies
- /api/users | POST | Add a user to the user DB
- /api/users/{id} | GET | Gets a user

## Security and Authentication

The API used JWT to encrypt user data.

Movie info route requires login.

## Integrating with React App

All views besides favorites and watchlist use the Web API.

General integration with the react app used in the API labs to allow for user functionality/authentication and calls to the Web API.

## Independent learning (if relevant)

MUI dialogue box opens in the middle of the screen when logging in, signing up or try to access a feature that's locked behind a login.
conditional displaying of these buttons based on whether a user is logged in or not.