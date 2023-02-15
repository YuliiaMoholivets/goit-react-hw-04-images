import { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';
import { Searchbar } from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import { Container, ErrorMessage } from './App.styled';
import fetchImages from '../../servises/images-api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [pageTotal, setPageTotal] = useState(0);
  const [status, setStatus] = useState('');
  useEffect(() => {
    if (searchWord === '') return;

    const getImages = async () => {
      try {
        setStatus('LOADING');
        const { images, totalImages } = await fetchImages(
          searchWord,
          pageNumber
        );
        if (images.length === 0) {
          setStatus('ERROR');
        }
        console.log(images);
        console.log(totalImages);
        setImages(prevState => [...prevState, ...images]);
        setPageTotal(totalImages);
        setStatus('OK');
      } catch (error) {
        setStatus('ERROR');
      }
    };
    getImages();
  }, [pageNumber, searchWord]);

  const formSubmitHandler = keyWord => {
    if (searchWord !== keyWord) {
      setSearchWord(keyWord);
      setPageNumber(1);
      setImages([]);
    }
  };

  const handleIncrement = () => {
    setPageNumber(PrevNumber => PrevNumber + 1);
  };
  const lastPageDef = () => {
    let lastPage = Number(pageTotal % 12);
    if (lastPage === 0) {
      return (lastPage = Number(pageTotal / 12));
    } else {
      return (lastPage = Number.parseInt(pageTotal / 12) + 1);
    }
  };

  return (
    <Container>
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery data={images} />
      {status === 'ERROR' && (
        <ErrorMessage>No images for keyword "{searchWord}"</ErrorMessage>
      )}
      {status === 'LOADING' && <Loader />}
      {status === 'OK' &&
        images.length > 11 &&
        pageNumber !== lastPageDef() && (
          <Button text={'Load more'} type="button" onClick={handleIncrement} />
        )}
      {pageNumber === lastPageDef() && pageTotal > 0 && (
        <ErrorMessage>You've reached the end of search results.</ErrorMessage>
      )}
    </Container>
  );
};
