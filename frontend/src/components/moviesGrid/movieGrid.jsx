import React, { useState } from "react";
import "./movieGrid.css";
import useFetch from "../../hooks/useFetch/useFetch.js"

const MovieGrid = ({moviesPerRow }) => {
  const movies = [
    {
      id: 1,
      name: "Inception",
      image: "https://via.placeholder.com/150",
      description: "A mind-bending thriller where dream invasion is possible."
    },
    {
      id: 2,
      name: "The Matrix",
      image: "https://via.placeholder.com/150",
      description: "A hacker discovers the reality he lives in is a simulated reality."
    },
    {
      id: 3,
      name: "Interstellar",
      image: "https://via.placeholder.com/150",
      description: "A team of explorers travel through a wormhole in space."
    },
    {
      id: 4,
      name: "The Dark Knight",
      image: "https://via.placeholder.com/150",
      description: "Batman faces his greatest challenge against the Joker."
    },
    {
      id: 5,
      name: "Pulp Fiction",
      image: "https://via.placeholder.com/150",
      description: "A series of interwoven stories involving crime in Los Angeles."
    },
    {
      id: 6,
      name: "Fight Club",
      image: "https://via.placeholder.com/150",
      description: "An insomniac office worker and a soap salesman form an underground fight club."
    },
    {
      id: 7,
      name: "Forrest Gump",
      image: "https://via.placeholder.com/150",
      description: "The life story of a man with a low IQ who inadvertently influences historical events."
    },
    {
      id: 8,
      name: "Gladiator",
      image: "https://via.placeholder.com/150",
      description: "A betrayed Roman general seeks revenge in the Colosseum."
    }
  ];

  const { data, loading, error } = useFetch("http://localhost:5000/movies")

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const rows = [];
  for (let i = 0; i < movies.length; i += moviesPerRow) {
    rows.push(movies.slice(i, i + moviesPerRow));
  }

  return (
    <div className="movie-grid">
      <div className="movie-list">

        {rows.map((row, index) => {
          
          const { data, loading, error } = useFetch("https://api.themoviedb.org/3/movie/343611?api_key=6309c0036b51c942d911a6b51fcce815")
          const img_path = "https://image.tmdb.org/t/p/w500/"

          return (
          <div key={index} className="movie-row">
            {row.map((movie) => (
              <div
                key={movie.id}
                className="movie"
                onClick={() => handleMovieClick(movie)}
              >
                <img 
                  src={img_path + data.belongs_to_collection.poster} 
                  alt={data.belongs_to_collection.name} 
                  className="movie-image" 
                />
                
                <p className="movie-name">{data.belongs_to_collection.name}</p>
              </div>
            ))}
          </div>
        )})}
      </div>
      {selectedMovie && (
        <div className="movie-description">
          <h2>{selectedMovie.name}</h2>
          <p>{selectedMovie.description}</p>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;
