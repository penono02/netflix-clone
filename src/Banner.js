import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./Requests";

import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState();

  useEffect(() => {
    async function fetData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request; //because it's a rquest, it's always good to return it
    }

    fetData();
  }, []);

  console.log(movie);
  function truncate(string, n) {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <div className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </div>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom" />
      {/*css trick: Whenever you have a parent div, and want to add a fade to the bottom of it, use this trick */}
    </header>
  );
}

export default Banner;
