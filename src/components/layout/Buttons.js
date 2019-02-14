import React from 'react';


function Buttons(props) {
  return (
    <div className="row mt-2 pb-2 mb-5">
      <div className="col-12 d-flex justify-content-center">
        <button onClick={props.randomFetch} className="btn btn-danger px-5 py-1 m-2">
          <i className="my-thumbs far fa-thumbs-down"></i>
        </button>
        <button onClick={props.similarFetch} className="btn btn-success px-5 py-1 m-2">
          <i className="my-thumbs far fa-thumbs-up"></i>
        </button>
      </div>
    </div>
  )
}

export default Buttons;