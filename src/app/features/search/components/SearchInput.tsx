import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchInput = ({
  searchTerm,
  placeholderText,
  submitEvent,
  className,
}) => {
  const [stateValue, setStateValue] = useState(searchTerm);
  useEffect(() => setStateValue(searchTerm), [searchTerm]);

  const handleChange = event => {
    setStateValue(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key == 'Enter') {
      handleSubmit(event);
    }
  };

  const handleSubmit = event => {
    if (event) event.preventDefault();
    submitEvent && submitEvent(stateValue, 0);

    if (!submitEvent) alert(stateValue, 0);
  };

  return (
    <form className={className}>
      <label htmlFor="searchInput">Keyword search</label>
      <input
        type="text"
        placeholder={placeholderText ? placeholderText : 'Search'}
        autoComplete="off"
        value={stateValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        id="searchInput"
      />
      <button onClick={handleSubmit}>Go</button>
    </form>
  );
};

SearchInput.propTypes = {
  searchTerm: PropTypes.string,
  placeholderText: PropTypes.string,
  submitEvent: PropTypes.func,
  className: PropTypes.string,
};

export default SearchInput;
