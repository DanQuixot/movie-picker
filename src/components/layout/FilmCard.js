import React from 'react';
import loader from '../../img/loader.gif';




function FilmCard(props) {
  return (
    <div className="container shadow-lg pt-2 pb-4 bg-light border border-light rounded" >
      <div className="container justify-content-center d-flex">
        <div className="row">
          <div className="col-lg-6 justify-content-center align-items-center d-flex">
            {props.filmData.isLoading ?
              <img
                src={loader}
                alt="poster"
                id="poster"
              /> :
              <img
                src={props.filmData.poster}
                alt="poster"
                id="poster"
              />
            }
          </div>

          <div className="col-lg-6">
            <h2 className="text-center my-3 my-title"><b>{props.filmData.title} ({props.filmData.year})</b></h2>
            <p><b>Director:</b> {props.filmData.director}</p>
            <p><b>Genre:</b> {props.filmData.genre}</p>
            <p className="actors-paragraph"><b>Actors:</b> {props.filmData.actors}</p>
            <p className="plot-paragraph"><b>Plot: </b>"{props.filmData.plot}"</p>
            <div className="container shadow-sm mt-5 bg-light border border-light rounded">
              <div className="row justify-content-around">
                <div className="col-12 col-md-6 col-lg-4">
                  <p className="text-center mb-0"><b>Rated</b></p>
                  <p className="text-center">{props.filmData.rated}</p>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <p className="text-center mb-0"><b>BoxOffice</b></p>
                  <p className="text-center" >{props.filmData.boxOffice}</p>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <p className="text-center mb-0"><b>Runtime</b></p>
                  <p className="text-center">{props.filmData.runtime}</p>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <p className="text-center mb-0"><b>IMDB</b></p>
                  <p className="text-center">{props.filmData.imdbRating}/10</p>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <p className="text-center mb-0"><b>RottenTomatoes</b></p>
                  <p className="text-center">{props.filmData.rottenTomatoesRating}</p>
                </div>
                <div className="col-12 col-md-6 col-lg-4">
                  <p className="text-center mb-0"><b>Metacritic</b></p>
                  <p className="text-center">{props.filmData.metascore}/100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilmCard;

