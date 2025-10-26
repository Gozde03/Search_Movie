import React from 'react';

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image'}
        alt={movie.Title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-white font-bold text-lg">{movie.Title}</h2>
        <p className="text-gray-400">{movie.Year} • {movie.Type}</p>
      </div>
    </div>
  );
};

export default MovieCard;
