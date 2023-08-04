import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import '../Modal/Modal.module.css';

const modalRoot = document.getElementById('modal');

export class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloys();
    }
  };

  onClickOverlay = e => {
    if (e.currentTarget === e.target) {
      this.props.onCloys();
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  render() {
    return createPortal(
      <div className="custom-overlay" onClick={this.onClickOverlay}>
        <div className="custom-modal">
          <img
            src={this.props.imgModal}
            alt={this.props.modalTags}
            loading="lazy"
          />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  imgModal: PropTypes.string.isRequired,
  onCloys: PropTypes.func.isRequired,
  modalTags: PropTypes.string.isRequired,
};

export default Modal;
