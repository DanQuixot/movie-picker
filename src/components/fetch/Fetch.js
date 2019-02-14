import React, { Component } from 'react';
import Buttons from '../layout/Buttons';
import FilmCard from '../layout/FilmCard';

class Fetch extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      year: '',
      rated: '',
      runtime: '',
      genre: '',
      director: '',
      actors: '',
      poster: '',
      metascore: '',
      imdbRating: '',
      rottenTomatoesRating: '',
      imdbID: '',
      boxOffice: '',
      plot: '',
      tmdbID: '',
      isLoading: true,
      showErrorModal: false
    };
  };

  /////////////////////////////Fetch random movie //////////////////////////////
  randomFetch = async () => {
    this.setState({ isLoading: true });
    try {
      // Initial tmdb Fetch
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=e1c16f19acb1ba81e7eff26f92ed5a48&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${Math.floor(Math.random() * 500)}&release_date.gte=1996-01-01&vote_count.gte=47`;
      let apiCall = await fetch(url);
      let response = await apiCall.json();
      let resultsArrayLength = response.results.length;
      let random = Math.floor(Math.random() * resultsArrayLength);
      let tmdbID = response.results[random].id;
      this.setState({ tmdbID: tmdbID });

      await this.secondPartFetch();
    } catch (err) {
      alert("There was an error loading a movie. Please, reload the page");
      console.log(err);
    }
  };


  ///////////////////// Fetch Similar movie ////////////////////
  similarFetch = async () => {
    this.setState({ isLoading: true });
    // Initial tmdb Fetch
    try {
      let url = `https://api.themoviedb.org/3/movie/${this.state.tmdbID}/similar?api_key=e1c16f19acb1ba81e7eff26f92ed5a48&language=en-US&page=1`;
      let apiCall = await fetch(url);
      let response = await apiCall.json();

      if (response.results.length > 0) {
        let resultsArrayLength = response.results.length;
        let random = Math.floor(Math.random() * resultsArrayLength);
        let tmdbID = response.results[random].id;
        this.setState({ tmdbID: tmdbID });

        await this.secondPartFetch();
      } else {
        this.randomFetch();
      };
    } catch (err) {
      alert("There was an error loading a movie. Please, reload the page");
      console.log(err);
    }
  };

  //////////// Second part of the Fetch /////////////////////////
  secondPartFetch = async () => {
    try {
      // Second tmdb Fetch for imdbID
      let url = `https://api.themoviedb.org/3/movie/${this.state.tmdbID}?api_key=e1c16f19acb1ba81e7eff26f92ed5a48`;
      let apiCall = await fetch(url);
      let response = await apiCall.json();
      let imdbID = response.imdb_id;

      //OMDB Fetch to get movie data
      url = (`http://www.omdbapi.com/?i=${imdbID}&apikey=1681159f`);
      apiCall = await fetch(url);
      response = await apiCall.json();
      let rottenTomatoesRating = 'N/A';
      let ratingsObject = response.Ratings ? response.Ratings.find(object => {
        return object.Source === "Rotten Tomatoes";
      }) : undefined;
      if (ratingsObject) {
        rottenTomatoesRating = ratingsObject.Value;
      }
      this.setState({
        title: response.Title,
        year: response.Year,
        rated: response.Rated,
        runtime: response.Runtime,
        genre: response.Genre,
        director: response.Director,
        actors: response.Actors,
        poster: response.Poster,
        metascore: response.Metascore,
        rottenTomatoesRating: rottenTomatoesRating,
        imdbRating: response.imdbRating,
        boxOffice: response.BoxOffice,
        plot: response.Plot,
        isLoading: false
      });
    } catch (err) {
      alert("There was an error loading a movie. Please, reload the page");
      console.log(err);
    };
  };

  ///////////////////// Fetch initial random Film on load/////////////////////////
  componentDidMount() {
    this.randomFetch();
  };

  render() {
    return (
      <div>
        <FilmCard
          filmData={this.state}
          randomFetch={this.randomFetch}
          similarFetch={this.similarFetch}
        />
        <Buttons
          randomFetch={this.randomFetch}
          similarFetch={this.similarFetch}
        />
      </div>
    )
  };
};
export default Fetch;