import React, { Component } from 'react';
import SearchBar from './Searchbar/Searchbar';
import Button from '../components/Button/Button';
import Api from '../service/api';
import Loader from 'components/Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import css from './App.module.css';

export class App extends Component {
  state = {
    name: '',
    img: [],
    page: 1,
    tags: '',
    totalPages: 0,
    isLoading: false,
    modalImg: null,
    modalTags: '',
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
    const scrollStep = -window.scrollY / 50;

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  };

  onClickModalOpen = (imgModal, tags) => {
    this.setState({ modalImg: imgModal, modalTags: tags });
  };

  onClickModalClose = () => {
    this.setState({ modalImg: null, modalTags: '' });
  };

  clickBtn = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { img, page, isLoading, totalPages, modalImg, modalTags } =
      this.state;
    return (
      <div className={css.app}>
        <SearchBar onSubmit={this.onSubmit} />
        {modalImg && (
          <Modal
            onClose={this.onClickModalClose}
            imgModal={modalImg}
            modalTags={modalTags}
          />
        )}
        <ImageGallery items={img} openModal={this.onClickModalOpen} />
        <Button
          onClick={this.clickBtn}
          img={img}
          totalPages={totalPages}
          page={page}
        />
        {isLoading && <Loader isLoading={isLoading} />}
      </div>
    );
  }
}
