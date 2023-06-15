import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  StyledImageGallery,
  StyledImageGalleryItem,
  StyledItemImage,
} from './ImageGalleryStyled';

import Modal from 'components/Modal/Modal';

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openModal = image => {
    setSelectedImage(image);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.classList.remove('modal-open');
  };

  const handleKeyDown = event => {
    if (event.keyCode === 27) {
      closeModal();
    }
  };

  return (
    <div>
      <StyledImageGallery>
        {images.map(image => {
          const { id, webformatURL, tags } = image;
          return (
            <StyledImageGalleryItem key={id} onClick={() => openModal(image)}>
              <StyledItemImage src={webformatURL} alt={tags} />
            </StyledImageGalleryItem>
          );
        })}
      </StyledImageGallery>

      {selectedImage && (
        <Modal
          imgURL={selectedImage.largeImageURL}
          alt={selectedImage.tags}
          closeModal={closeModal}
          onKeyDown={handleKeyDown}
        />
      )}
    </div>
  );
};

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
