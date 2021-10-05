import React from 'react';
import mapEntriesToResults from '../transformations';
import { SearchProps, withSearch } from '@zengenti/contensis-react-base/search';
import uniqueID from '~/core/util/unique';
import ResultCard from '../components/ResultCard';

type ResultCard = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const SearchContainer = ({ results }: SearchProps<ResultCard>) => {
  return (
    <div>
      <h1>Search</h1>
      {results.map(result => (
        <ResultCard key={uniqueID()} {...result} />
      ))}
    </div>
  );
};

export default withSearch(mapEntriesToResults)(SearchContainer);
