import React from 'react';
import PropTypes from 'prop-types';
import './SearchResultsBar.css';

function SearchResultsBar({ phrase }) {
  return (
    <div className="search-results-bar">
      <p className="search-results-bar__phrase">
        {phrase}
      </p>
    </div>
  );
}

SearchResultsBar.propTypes = {
  phrase: PropTypes.string,
};
SearchResultsBar.defaultProps = {
  phrase: 'Ничего не найдено',
};
export default SearchResultsBar;
