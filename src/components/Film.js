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
      rottenTomatoesRating: '',
      imdbID: '',
      boxOffice: '',
      plot: ''
    };
  };
  componentDidMount() {

    fetch('http://www.omdbapi.com/?i=tt0114369&apikey=1681159f')
      .then(response => {
        return response.json();
      }).then(data => {
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
          imdbRating: data.imdbRating,
          rottenTomatoesRating: data.Ratings[1].Value,
          imdbID: data.imdbID,
          boxOffice: data.BoxOffice,
          plot: data.Plot
        })
      })

  };
  render() {
    return (
      <div className="container shadow-lg mt-2 p-5 bg-light border border-light rounded">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img src={this.state.poster} alt="poster" className="mx-auto d-block" id="poster" />
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
        <div className="row mt-4 ">
          <div className="col-12 d-flex justify-content-center">
            <button className="btn btn-danger m-1"><i className="fas fa-arrow-left mt-1"></i> It's a miss</button>
            <button className="btn btn-success px-3 m-1">Like this <i className="fas fa-arrow-right mt-1"></i></button>
          </div>
        </div>
      </div>
    )
  }
};

export default Film;
