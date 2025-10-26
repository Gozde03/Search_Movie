import React, { useState } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_KEY}&s=${query}`
      );
      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError("Movie not found 😔");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <h1 className="title">🎬  Search a Movie  🎬</h1>

      {/* Search Bar */}
      <form className="search-form" onSubmit={searchMovies}>
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button" type="submit">
          <span className="emoji">🎭</span>
        </button>
      </form>

      {/* Error */}
      {error && <p className="error-message">{error}</p>}

      {/* Loading */}
      {loading && (
        <div className="loader">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      )}

      {/* Movies */}
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </>
  );
}
