import { useState } from 'react';
import {
  Searchcomponent,
  SearchForm,
  SearchFormButtonLabel,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [keyWord, setKeyWord] = useState('');

  const handleSearchChange = event => {
    setKeyWord(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (keyWord.trim() === '') {
      alert('Enter a search word.');
      return;
    }
    onSubmit(keyWord);
    setKeyWord('');
  };

  return (
    <Searchcomponent>
      <SearchForm className="form" onSubmit={handleSubmit}>
        <SearchFormButton type="submit" className="button">
          <SearchFormButtonLabel className="button-label">
            Search
          </SearchFormButtonLabel>
          <FaSearch width="48" height="48" />
        </SearchFormButton>
        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="keyWord"
          value={keyWord}
          onChange={handleSearchChange}
        />
      </SearchForm>
    </Searchcomponent>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
