import { useState, useEffect } from 'react';
import css from './App.module.css';
import searchImages from 'services/pixabay';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalURL, setModalURL] = useState('');

  const onSubmitInput = query => {
    setQuery(query);
    searchImages(query, page);
    setImages([]);
  };

  const showResponse = async () => {
    try {
      const response = await searchImages(query, page);
      setTotalHits(response.data.total);
      setImages(prev => [...prev, ...response.data.hits])
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
if(query){
    setIsLoading(true);
    showResponse();
}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]); 
  

  const loadMoreButton = e => {
    setPage(prev => prev + 1);
  };

  const closeModalByEscape = e => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  const closeModalByOverlay = e => {
    if (e.target.name !== 'IMG') {
      setIsModalOpen(false);
    }
  };

  const imageClicked = e => {
    e.preventDefault();
    const url = e.target.dataset['src'];
    setIsModalOpen(true);
    setModalURL(url);
  };

  let totalPages = Math.ceil(totalHits / 12);

  return (
    <>
      <div className={css.App}>
        <Searchbar onSubmitInput={onSubmitInput} />
        {images.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem images={images} onClick={imageClicked} />
          </ImageGallery>)
        }
        {isError && alert("Ups, coś poszło nie tak. Spróbuj wyszukać coś innego.")}
        {isLoading && <Loader />}
        {page < totalPages && <Button loadMoreButton={loadMoreButton} titleButton={"Load more"} />}
      </div>
      {isModalOpen && <Modal
        closeModalByEscape={closeModalByEscape}
        closeModalByOverlay={closeModalByOverlay}
        src={modalURL}
        alt={query} />}
    </>
  );
};