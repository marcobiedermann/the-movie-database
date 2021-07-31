/* eslint-disable camelcase */

import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import Movie from '../../components/Movie';

interface Params {
  movieId: string;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  iso_639_1: string;
  name: string;
}

type Status = 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';

interface MoviePageQuery {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: Record<string, unknown> | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: Status;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const MoviePage: FC = () => {
  const { movieId } = useParams<Params>();
  const { data, error } = useSWR<MoviePageQuery>(`/movie/${movieId}`);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading …</div>;
  }

  return (
    <div>
      <Movie {...data} />
    </div>
  );
};

export default MoviePage;
