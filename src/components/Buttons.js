import React from 'react';

function Buttons() {
  return (
    <div className="row mt-2 ">
      <div className="col-12 d-flex justify-content-center">
        <button className="btn btn-danger px-5 py-1 m-2"><i className="my-thumbs far fa-thumbs-down"></i></button>
        <button className="btn btn-success px-5 py-1 m-2"><i className="my-thumbs far fa-thumbs-up"></i></button>
      </div>
    </div>
  )
}
export default Buttons;