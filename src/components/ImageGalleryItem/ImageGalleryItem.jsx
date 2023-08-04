import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, openModal }) => {
  return (
    <li className={css.imageGalleryItem}>
      <img
        onClick={() => openModal(largeImageURL, tags)}
        className={css.imageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        loading="lazy"
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
