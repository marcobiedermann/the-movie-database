/* eslint-disable camelcase */

import React, { ChangeEvent, FC, useState } from 'react';
import useSWR from 'swr';
import Movies from '../Movies';
import Search from '../Search';
import './app.css';

interface Result {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface AppData {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

const App: FC = () => {
  const [query, setQuery] = useState('');
  const { data, error } = useSWR<AppData>(query ? `/search/movie?query=${query}` : '/movie/popular');

  if (error) {
    return <div>Error: {error}</div>;
  }

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    setQuery(value);
  };

  return (
    <div className="app">
      <Search query={query} onInput={onInput} />
      {data ? <Movies movies={data.results} /> : <div>Loading …</div>}
    </div>
  );
};

export default App;
