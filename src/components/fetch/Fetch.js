import React, { Component } from 'react';
import Buttons from '../layout/Buttons';
import FilmCard from '../layout/FilmCard';


class RandomFetch extends Component {
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
      tmdbID: ''
    }
  };

  /////////////////////////////Fetch random movie //////////////////////////////
  randomFetch = async () => {
    // Initial tmdb Fetch
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=e1c16f19acb1ba81e7eff26f92ed5a48&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${Math.floor(Math.random() * 500)}&release_date.gte=1996-01-01`;
    let apiCall = await fetch(url);
    let response = await apiCall.json();
    let random = Math.floor(Math.random() * 9)
    let tmdbID = response.results[random].id;
    this.setState({ tmdbID: tmdbID });

    await this.secondPartFetch();
  };


  ///////////////////// Fetch Similar movie ////////////////////
  similarFetch = async () => {
    // Initial tmdb Fetch
    let url = `https://api.themoviedb.org/3/movie/${this.state.tmdbID}/similar?api_key=e1c16f19acb1ba81e7eff26f92ed5a48&language=en-US&page=1`;
    let apiCall = await fetch(url);
    let response = await apiCall.json();
    let random = Math.floor(Math.random() * 9)
    let tmdbID = response.results[random].id;
    this.setState({ tmdbID: tmdbID });

    await this.secondPartFetch();
  }

  //////////// Second part of the Fetch /////////////////////////
  secondPartFetch = async () => {
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
      plot: response.Plot
    })
    console.log(this.state)
  }

  ///////////////////// Fetch initial random Film /////////////////////////
  componentDidMount() {
    this.randomFetch();
  }

  render() {
    return (

      <div>
        <FilmCard filmData={this.state} />
        <Buttons
          randomFetch={this.randomFetch}
          similarFetch={this.similarFetch}
        />
      </div>
    )
  }

}
export default RandomFetch;