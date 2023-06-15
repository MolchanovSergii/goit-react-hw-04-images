import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import {
  StyledHeader,
  StyledSearchForm,
  StyledSearchBtn,
  StyledSearchInput,
} from './SearchBarStyled';

export const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handlerChangeQuery = event => {
    setValue(event.target.value);
  };

  const handlerSubmitForm = event => {
    event.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <StyledHeader>
      <StyledSearchForm onSubmit={handlerSubmitForm}>
        <StyledSearchBtn type="submit">
          <FaSearch />
        </StyledSearchBtn>

        <StyledSearchInput
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handlerChangeQuery}
          value={value}
        />
      </StyledSearchForm>
    </StyledHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
