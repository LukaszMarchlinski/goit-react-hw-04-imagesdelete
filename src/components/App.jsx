import React, { Component } from 'react';
import css from './App.module.css';
import searchImages from 'services/pixabay';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalHits: null,
    isLoading: false,
    isError: false,
    isModalOpen: false,
    modalURL: '',
  };

  onSubmitInput = query => {
    this.setState({ query: query });
    const { page } = this.state;
    searchImages(query, page);
  };

  showResponse = async () => {
    const { query, page } = this.state;
    try {
      const response = await searchImages(query, page);
      this.setState(prevState => ({
        totalHits: response.data.total,
        images: [...prevState.images, ...response.data.hits],
      }));
    } catch (error) {
      this.setState({ isError: true, isLoading: false })
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(_prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.page !== page) {
      this.setState({ isLoading: true });
      this.showResponse();
    } else if (prevState.query !== query) {
      this.setState({ isLoading: true });
      this.setState({ images: [] });
      this.showResponse();
    }
  };

  loadMoreButton = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  closeModalByEscape = e => {
    if (e.key === 'Escape') {
      this.setState({ isModalOpen: false });
    }
  };

  closeModalByOverlay = e => {
    if (e.target.name !== 'IMG') {
      this.setState({ isModalOpen: false });
    }
  };

  imageClicked = e => {
    e.preventDefault();
    const url = e.target.dataset['src'];
    this.setState({ isModalOpen: true, modalURL: url });
  };


  render() {
    const { query, images, totalHits, page, isLoading, isError, modalURL, isModalOpen } = this.state;
    const totalPages = Math.ceil(totalHits / 12);

    return (
      <>
      <div className={css.App}>
        <Searchbar onSubmitInput={this.onSubmitInput} />
        {images.length > 0 && (
          <ImageGallery>
              <ImageGalleryItem images={images} onClick={this.imageClicked} />
          </ImageGallery>)
        }
        {isError && alert("Ups, coś poszło nie tak. Spróbuj wyszukać coś innego.")}
        {isLoading && <Loader/>}
        {page < totalPages && <Button loadMoreButton={this.loadMoreButton} titleButton={"Load more"} />}
        </div>
        {isModalOpen && <Modal
          closeModalByEscape={this.closeModalByEscape}
          closeModalByOverlay={this.closeModalByOverlay}
          src={modalURL}
          alt={query} />}
        </>
    );
  };
}