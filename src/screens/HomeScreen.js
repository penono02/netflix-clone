import React from "react";
import Nav from "../Nav";
import Banner from "../Banner";
import "./HomeScreen.css";
import Row from "../Row";
import requests from "../Requests";

function HomeScreen() {
  return (
    <div className="homeScreen">
      {/*NavBar */}
      <Nav />

      {/* Banner */}
      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentariesMovies} />

      <div className="home__overlay" />
      <div className="home__body">
        <h1>Unlimited films, TV programs and more.</h1>
        <div className="home__input">
          <form>
            <input type="email" placeholder="Email Address" />
            <button className="home__getStarted"> GET STARTED</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
