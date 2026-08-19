import { useState } from 'react'
import SearchBar from './components/SearchBar'
import MovieCard from './components/MovieCard'
import MoviePoster from './components/MoviePoster'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [movieDetails, setMovieDetails] = useState(null)

  async function handleSearch(term) {
    setSearchTerm(term)
    setLoading(true)
    setError('')
    setSelectedMovie(null)
    setMovieDetails(null)

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${term}`
    )

    const data = await response.json()

    if (data.Search) {
      setMovies(data.Search)
    } else {
      setMovies([])
      setError(data.Error)
    }

    setLoading(false)
  }

  async function handleMovieClick(movie) {
    setSelectedMovie(movie)

    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&i=${movie.imdbID}&plot=full`
    )

    const data = await response.json()

    setMovieDetails(data)
  }

  function closeMovieDetails() {
    setSelectedMovie(null)
    setMovieDetails(null)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 Movie Finder</h1>
        <p>Discover your next favorite movie</p>
      </header>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading movies...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <h2>Movie Not Found</h2>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && <p>Movies found: {movies.length}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onMovieClick={handleMovieClick}
          />
        ))}
      </div>

      {movieDetails && (
        <div className="movie-details">
          <MoviePoster
            src={movieDetails.Poster}
            alt={movieDetails.Title}
            className="details-poster"
          />

          <div className="movie-details-info">
            <h2>{movieDetails.Title}</h2>

            <p><strong>Year:</strong> {movieDetails.Year}</p>
            <p><strong>Genre:</strong> {movieDetails.Genre}</p>
            <p><strong>Director:</strong> {movieDetails.Director}</p>
            <p><strong>Actors:</strong> {movieDetails.Actors}</p>
            <p><strong>IMDb Rating:</strong> ⭐ {movieDetails.imdbRating}</p>
            <p><strong>Runtime:</strong> {movieDetails.Runtime}</p>

            <h3>Plot</h3>
            <p>{movieDetails.Plot}</p>

            <button onClick={closeMovieDetails}>
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App