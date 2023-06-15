import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import fetchApi from '../../src/services/fetchApi';
import { StyledApp } from './AppStyled';
import { SearchBar } from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreButton from './Button/Button';
import Loader from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [isEmpty, setIsEmpty] = useState(false);
  const [fetchImageLength, setFetchImageLength] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const fetchedImages = await fetchApi(query, page);
        if (!fetchedImages.hits.length) {
          Notify.warning(
            'No results were found for your search, please try something else.'
          );
        }
        setImages(prevImages => [...prevImages, ...fetchedImages.hits]);
        setFetchImageLength(fetchedImages.hits.length);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        Notify.failure(`Sorry, something went wrong. ${error.message}`);
      }
    };

    if (query !== '' && (query !== '' || page !== 1)) {
      fetchData();
    }
  }, [query, page]);

  const handleSubmit = value => {
    if (query === value) {
      return;
    }
    resetState();
    setQuery(value);
  };

  const resetState = () => {
    setQuery('');
    setPage(1);
    setImages([]);
    setIsLoading(false);
    // setIsEmpty(false);
    setFetchImageLength(0);
  };

  const handleIncreasePage = () => {
    setPage(prevPage => prevPage + 1);
    window.scrollBy({
      top: 300 * 3,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <StyledApp>
        <SearchBar onSubmit={handleSubmit} />
        {isLoading ? <Loader /> : <ImageGallery images={images} />}

        {images.length > 0 && fetchImageLength === 12 && (
          <LoadMoreButton onClick={handleIncreasePage} />
        )}
      </StyledApp>
    </>
  );
};
