import { useState } from 'react';
import {
  ImageGalleryEl,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ id, src, largeSrc }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(PrevshowModal => {
      if (PrevshowModal === true) {
        return false;
      }
      if (PrevshowModal === false) {
        return true;
      }
    });
  };

  return (
    <>
      <ImageGalleryEl key={id}>
        <ImageGalleryItemImage src={src} alt="foto" onClick={toggleModal} />
      </ImageGalleryEl>
      {showModal && (
        <Modal src={largeSrc} onClose={toggleModal}>
          <img src={largeSrc} alt="foto" />
        </Modal>
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  largeSrc: PropTypes.string.isRequired,
};
