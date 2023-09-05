import React, { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";
// API Key c39bcddf
// Now we need to call this API to get all data we need about our movies
// first, we will create static variable
const API_URL = "http://www.omdbapi.com?apikey=c39bcddf";
// now we want to fetch the data of that API as soon as our component loads
// so we need to use the useEffect Hook
// const movie1 = {
//   Title: "Tokyo Ghoul: Re - Anime",
//   Year: "2018",
//   imdbID: "tt8046356",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BNGU5ZDA0MDUtMDBlYS00OGIyLThjYTYtMmRkODc0MGYyNDE5XkEyXkFqcGdeQXVyMjI2ODkzODY@._V1_SX300.jpg",
// };
const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&S=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Anime");
  }, []);
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          placeholder="Search for movies.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
          ;
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
