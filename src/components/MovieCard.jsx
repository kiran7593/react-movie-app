import MoviePoster from './MoviePoster'

function MovieCard({ movie, onMovieClick }) {
  return (
    <div
      className="movie-card"
      onClick={() => onMovieClick(movie)}
    >
      <MoviePoster
        src={movie.Poster}
        alt={movie.Title}
      />

      <div className="movie-info">
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
      </div>
    </div>
  )
}

export default MovieCard