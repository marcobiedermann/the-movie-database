import React, { ChangeEvent, FC } from 'react';
import './search.css';

export interface SearchProps {
  query: string;
  onInput: (_event: ChangeEvent<HTMLInputElement>) => void;
}

const Search: FC<SearchProps> = (props) => {
  const { query, onInput } = props;

  return (
    <form className="search">
      <input placeholder="Search for movie title …" type="search" value={query} onChange={onInput} />
    </form>
  );
};

export default Search;
