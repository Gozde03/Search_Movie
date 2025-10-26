
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";
import ErrorMessage from "../components/errorMessage";


export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?i=${id}&apikey=YOUR_API_KEY`
        );
        const data = await res.json();

        if (data.Response === "False") {
          setError(data.Error);
        } else {
          setMovie(data);
        }
      }  catch (err) {
        console.error(err); 

        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="movie-detail">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="movie-info">
        <h1>{movie.Title}</h1>
        <p><strong>Year:</strong> {movie.Year}</p>
        <p><strong>Genre:</strong> {movie.Genre}</p>
        <p><strong>Director:</strong> {movie.Director}</p>
        <p><strong>Actors:</strong> {movie.Actors}</p>
        <p><strong>Plot:</strong> {movie.Plot}</p>
        <p><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}</p>
      </div>
    </div>
  );
}
