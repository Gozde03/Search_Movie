import React, { useState } from "react"; // useEffect kaldırıldı

import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (query) => {
    if (!query) {
      setMovies([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=d5e202eb&s=${query}`);
      const data = await res.json();
      setMovies(data.Search || []);
    } catch (error) {
      console.error(error);
      setMovies([]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <SearchBar onSearch={fetchMovies} />
      {loading ? (
        <p className="text-white text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
