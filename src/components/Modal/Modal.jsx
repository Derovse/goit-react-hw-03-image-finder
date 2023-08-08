import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

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

  render() {
    const modalClasses = classnames(css.modal, 'modal');
    return (
      <div className={modalClasses}>
        <div className={css.overlay} onClick={this.handleBackdropClick}>
          <div className={css.customModal}>
            <img
              src={this.props.imgModal}
              alt={this.props.modalTags}
              loading="lazy"
              onClick={this.showBasicLightbox}
            />
          </div>
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
