import React, { Component } from 'react';

class Film extends Component {
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
      rottenTomatoesRating: 'N/A',
      imdbID: '',
      boxOffice: '',
      plot: ''
    };
  };
  componentWillMount() {
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
  };

  render() {
    return (
      <div className="container shadow-lg mt-2 p-4 bg-light border border-light rounded" >
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img src={this.state.poster} alt="poster" className="mx-auto d-block my-3" id="poster" />
            </div>
            <div className="col-lg-6">
              <h2 className="text-center my-3"><b>{this.state.title} ({this.state.year})</b></h2>
              <p><b>Director:</b> {this.state.director}</p>
              <p><b>Genre:</b> {this.state.genre}</p>
              <p><b>Actors:</b> {this.state.actors}</p>
              <p>"{this.state.plot}"</p>
              <div className="container shadow-sm mt-5 bg-light border border-light rounded">
                <div className="row justify-content-around">
                  <div className="col-12 col-md-6 col-lg-4">
                    <p className="text-center mb-0"><b>Rated</b></p>
                    <p className="text-center">{this.state.rated}</p>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <p className="text-center mb-0"><b>BoxOffice</b></p>
                    <p className="text-center" >{this.state.boxOffice}</p>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <p className="text-center mb-0"><b>Runtime</b></p>
                    <p className="text-center">{this.state.runtime}</p>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <p className="text-center mb-0"><b>IMDB</b></p>
                    <p className="text-center">{this.state.imdbRating}/10</p>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <p className="text-center mb-0"><b>RottenTomatoes</b></p>
                    <p className="text-center">{this.state.rottenTomatoesRating}</p>
                  </div>
                  <div className="col-12 col-md-6 col-lg-4">
                    <p className="text-center mb-0"><b>Metacritic</b></p>
                    <p className="text-center">{this.state.metascore}/100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2 ">
          <div className="col-12 d-flex justify-content-center">
            <button className="btn btn-danger px-5 py-1 m-2"><i className="my-thumbs far fa-thumbs-down"></i></button>
            <button className="btn btn-success px-5 py-1 m-2"><i className="my-thumbs far fa-thumbs-up"></i></button>
          </div>
        </div>
      </div>
    )
  }
};

export default Film;
