import React, {useState} from 'react';
import SearchComponent from '../component';

const SearchContainer = () => {
  const [state, setState] = useState({
    searchQuery: '',
  });
  return (
    <SearchComponent
      searchQuery={state.searchQuery}
      updateSearchQuery={setState}
    />
  );
};

export default SearchContainer;
