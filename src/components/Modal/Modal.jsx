// Modal.jsx

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css'; // Импортируем стили

export class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.customModal}>
          <img
            className={css.centeredImage}
            src={this.props.imgModal}
            alt={this.props.modalTags}
            loading="lazy"
          />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  imgModal: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  modalTags: PropTypes.string.isRequired,
};

export default Modal;
