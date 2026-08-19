import { useState } from 'react'

function SearchBar({ onSearch, loading }) {
  const [searchTerm, setSearchTerm] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (searchTerm.trim() === '') {
      return
    }

    onSearch(searchTerm)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}

export default SearchBar