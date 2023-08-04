import React, { Component } from 'react';

import SearchBar from './Searchbar/Searchbar';
import Button from '../components/Button/Button';
import Api from './Api';
import Loader from 'components/Loader/Loader';
import Modal from './Modal/Modal';
import ImageGallery from './ImageGallery/ImageGallery';

import css from './App.module.css';

export class App extends Component {
  state = {
    name: '',
    img: [],
    page: 1,
    tags: '',
    totalPages: 0,
    isLoading: false,
    modal: { isOpen: false, imgModal: null, tags: '' },
  };

  async componentDidUpdate(prevProps, prevState) {
    const { name, page } = this.state;
    if (prevState.name !== name || prevState.page !== page) {
      await this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { name, page } = this.state;

    this.setState({ isLoading: true });
    try {
      const images = await Api.images(name, page);
      this.setState(prevState => ({
        img: page === 1 ? images.hits : [...prevState.img, ...images.hits],
        totalPages: Math.floor(images.totalHits / 12),
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  onSubmit = name => {
    this.setState({ name, page: 1 }, () => {
      this.scrollToTop();
    });
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  onClickModalOpen = (img, tags) => {
    this.setState({ modal: { isOpen: true, imgModal: img, tags } });
  };

  onClickModalCloys = () => {
    this.setState({ modal: { isOpen: false, imgModal: null, tags: '' } });
  };

  clickBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { img, page, modal, isLoading, totalPages } = this.state;
    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.onSubmit} />
        {modal.isOpen && (
          <Modal
            onCloys={this.onClickModalCloys}
            imgModal={modal.imgModal}
            modalTags={modal.tags}
          />
        )}
        <ImageGallery openModal={this.onClickModalOpen} items={img} />
        <Button
          onClick={this.clickBtn}
          img={img}
          totalPages={totalPages}
          page={page}
        />
        {isLoading && <Loader isLoading={isLoading} />} {}
      </div>
    );
  }
}
