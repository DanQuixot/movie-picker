import React, { Component } from 'react';
import FilmLayout from './FilmLayout';
import Buttons from './Buttons';

class FilmFetch extends Component {
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
      plot: ''
    };
    this.randomFetchFilm = this.randomFetchFilm.bind(this);
  };
  randomFetchFilm() {
    // Generate random page number
    const random = Math.floor(Math.random() * 500);
    //TMDB initial fetch
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e1c16f19acb1ba81e7eff26f92ed5a48&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${random}&release_date.gte=1996-01-01`)
      .then(response => {
        return response.json();
      })
      .then(initialTMDBData => {
        // Pickout TMDB movie id - random out of 20 results on the page
        const tmdbID = initialTMDBData.results[Math.floor(Math.random() * 19)].id;
        // fetch TMDB movie info by tmdbID
        fetch(`https://api.themoviedb.org/3/movie/${tmdbID}?api_key=e1c16f19acb1ba81e7eff26f92ed5a48`)
          .then(response => {
            return response.json();
          })
          .then(movieTMDBData => {
            //Find and set imdbID
            this.setState({ imdbID: movieTMDBData.imdb_id })
            // fetch OMDB movie info by imdbID
            fetch(`http://www.omdbapi.com/?i=${this.state.imdbID}&apikey=1681159f`)
              .then(response => {
                return response.json();
              }) // Set state from OMDB API data
              .then(data => {
                let rottenTomatoesRating = 'N/A';
                let ratingsObject = data.Ratings ? data.Ratings.find(object => {
                  return object.Source === "Rotten Tomatoes";
                }) : undefined;
                if (ratingsObject) {
                  rottenTomatoesRating = ratingsObject.Value;
                }
                this.setState({
                  title: data.Title,
                  year: data.Year,
                  rated: data.Rated,
                  runtime: data.Runtime,
                  genre: data.Genre,
                  director: data.Director,
                  actors: data.Actors,
                  poster: data.Poster,
                  metascore: data.Metascore,
                  rottenTomatoesRating: rottenTomatoesRating,
                  imdbRating: data.imdbRating,
                  boxOffice: data.BoxOffice,
                  plot: data.Plot
                })
              })
          })
      })
  }
  componentDidMount() {
    this.randomFetchFilm();
  };

  render() {

    return (
      <div>
        <FilmLayout
          filmData={this.state}
        />
        <Buttons />
      </div>

    )
  }
};

export default FilmFetch;
