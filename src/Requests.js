const API_KEY = "58d34b17eb84d149becc421ec297e5b7"; //should be .env but for sake of a demo, we put it here

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=123`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentariesMovies: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

//as you already a backend like TMDB would provide you an API
//through the API, you can access its data
//we set the axios instance with base url so you don't have to type the base url all the time
//Since we will have to different requests with different for different genres, your best bet is to use an object - just to prepare things before hand
export default requests; //yes, we exports the requests object so that we can use it outside this file
