import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import fetchApi from '../../src/services/fetchApi';
import { StyledApp } from './AppStyled';
import { SearchBar } from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMoreButton from './Button/Button';
import Loader from './Loader/Loader';

export class App extends Component {
  initialState = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    isEmpty: false,
    fetchImageLength: 0,
  };

  state = { ...this.initialState };

  async componentDidUpdate(_, prevState) {
    const { query, page, images } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });

      try {
        const fetchImage = await fetchApi(query, page);
        if (!fetchImage.hits.length) {
          Notify.warning(
            'No results were found for your search, please try something else.'
          );
        }
        this.setState({
          images: [...images, ...fetchImage.hits],
          isLoading: false,
          fetchImageLength: fetchImage.hits.length,
        });
      } catch (error) {
        this.setState({ isLoading: false });
        Notify.failure(`Sorry something went wrong. ${error.message}`);
      }
    }
  }

  handleSubmit = value => {
    if (this.state.query === value) {
      return;
    }
    this.resetState();
    this.setState({ query: value });
  };

  handleIncreasePage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
    window.scrollBy({
      top: 300 * 3,
      behavior: 'smooth',
    });
  };

  resetState = () => {
    this.setState(this.initialState);
  };

  render() {
    const { images, isLoading, fetchImageLength } = this.state;
    return (
      <>
        <StyledApp>
          <SearchBar onSubmit={this.handleSubmit} />
          {isLoading ? <Loader /> : <ImageGallery images={this.state.images} />}

          {images.length > 0 && fetchImageLength === 12 && (
            <LoadMoreButton onClick={this.handleIncreasePage} />
          )}
        </StyledApp>
      </>
    );
  }
}
