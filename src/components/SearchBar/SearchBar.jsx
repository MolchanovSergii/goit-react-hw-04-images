import PropTypes from 'prop-types';

import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';

import {
  StyledHeader,
  StyledSearchForm,
  StyledSearchBtn,
  StyledSearchInput,
} from './SearchBarStyled';

export class SearchBar extends Component {
  state = {
    value: '',
  };

  handlerChangeQuery = event => {
    this.setState({ value: event.target.value });
  };

  handlerSubmitForm = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <StyledHeader>
        <StyledSearchForm onSubmit={this.handlerSubmitForm}>
          <StyledSearchBtn type="submit">
            <FaSearch />
          </StyledSearchBtn>

          <StyledSearchInput
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handlerChangeQuery}
            value={this.state.value}
          />
        </StyledSearchForm>
      </StyledHeader>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
