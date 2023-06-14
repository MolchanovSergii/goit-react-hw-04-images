import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  StyledImageGallery,
  StyledImageGalleryItem,
  StyledItemImage,
} from './ImageGalleryStyled';

import Modal from 'components/Modal/Modal';

class ImageGallery extends Component {
  state = {
    selectedImage: null,
  };

  images = this.props.images;

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  openModal = image => {
    this.setState({
      selectedImage: image,
    });
    document.body.classList.add('modal-open');
  };

  closeModal = () => {
    this.setState({
      selectedImage: null,
    });
    document.body.classList.remove('modal-open');
  };

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.closeModal();
    }
  };

  render() {
    const { selectedImage } = this.state;

    return (
      <div>
        <StyledImageGallery>
          {this.images.map(image => {
            const { id, webformatURL, tags } = image;
            return (
              <StyledImageGalleryItem
                key={id}
                onClick={() => this.openModal(image)}
              >
                <StyledItemImage src={webformatURL} alt={tags} />
              </StyledImageGalleryItem>
            );
          })}
        </StyledImageGallery>

        {selectedImage && (
          <Modal
            imgURL={selectedImage.largeImageURL}
            alt={selectedImage.tags}
            closeModal={this.closeModal}
            onKeyDown={this.handleKeyDown}
          />
        )}
      </div>
    );
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
