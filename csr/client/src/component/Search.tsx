import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { SearchBar, SearchInput, SearchButton } from './styles';

export const Search: React.FC = (props) => {
  const [keyword, setKeyword] = useState('');
  const history = useHistory();

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  };
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/results?search_query=${keyword}`);
    setKeyword('');
  };
  return (
    <SearchBar onSubmit={handleSearch}>
      <SearchInput
        type="text"
        placeholder="검색"
        value={keyword}
        onChange={handleChangeKeyword}
      />
      <SearchButton></SearchButton>
    </SearchBar>
  );
};
