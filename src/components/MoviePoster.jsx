import { useState } from 'react'

function MoviePoster({ src, alt, className = '' }) {
  const [imageError, setImageError] = useState(false)

  if (!src || src === 'N/A' || imageError) {
    return (
      <div className={`no-poster ${className}`}>
        No Poster Available
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setImageError(true)}
    />
  )
}

export default MoviePoster