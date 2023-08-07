import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css'; // Подключение стилей библиотеки

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

  showBasicLightbox = e => {
    e.stopPropagation();
    const { imgModal, modalTags } = this.props;
    const instance = basicLightbox.create(`
      <div class="custom-overlay">
        <div class="custom-modal">
          <img src="${imgModal}" alt="${modalTags}" loading="lazy" />
        </div>
      </div>
    `);
    instance.show();
  };

  render() {
    return (
      <div className="modal">
        <div className="custom-overlay" onClick={this.handleBackdropClick}>
          <div className="custom-modal">
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
