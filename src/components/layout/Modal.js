import React, { Component } from 'react';
import ModalComponent from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',

  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
ModalComponent.setAppElement('#root');

class Modal extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    // this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  // afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   this.subtitle.style.color = 'black';
  // }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <p onClick={this.openModal} id="about-link" className="float-right">About</p>
        <ModalComponent
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="About Modal"
        >
          <div className="container">
            <div className="row">
              <div className="col">
                <h4 className="text-center mb-4"><strong>How to use</strong></h4>
                <div className="mt-2">
                  <button className="btn btn-success px-4 py-0 m-2">
                    <i className="my-thumbs-modal far fa-thumbs-up"></i>
                  </button>
                  <span>- to fetch a Similar movie.</span><br />
                </div>
                <div className="mb-4">
                  <button className="btn btn-danger px-4 py-0 m-2">
                    <i className="my-thumbs-modal far fa-thumbs-down"></i>
                  </button>
                  <span>- to fetch a Random movie.</span><br />
                </div>
                <img src="https://www.themoviedb.org/assets/1/v4/logos/408x161-powered-by-rectangle-blue-10d3d41d2a0af9ebcb85f7fb62ffb6671c15ae8ea9bc82a2c6941f223143409e.png" alt="TMDB-Logo" id="tmdb-logo" />
                <p id="tmdb-paragraph">"This product uses the TMDb API but is not endorsed or certified by TMDb." </p>
                <p className="text-center" id="close-modal" onClick={this.closeModal}>Close</p>
              </div>
            </div>
          </div>
        </ModalComponent>
      </div>
    );
  }
}

export default Modal;
