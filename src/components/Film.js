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
      boxOffice: ''
    };
  };
  componentDidMount() {

    fetch('http://www.omdbapi.com/?i=tt0467406&apikey=1681159f')
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
          boxOffice: data.BoxOffice
        })
      })

  };
  render() {
    return (
      <div>
        <h1>Title here</h1>
        <h1>{this.state.title}</h1>
        <h6>{this.state.imdbID}</h6>
        <p>{this.state.boxOffice}</p>
      </div>
    )
  }
};

export default Film;
