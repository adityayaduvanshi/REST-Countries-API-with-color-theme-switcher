import { useContext } from 'react';
import Card from './Card';
import { CountriesContext } from '../../context/countriesContext';
import SkeletonCard from '../Skeleton';

import './style.scss';

const Cards = () => {

  const { data, isLoading, isError, searchedCountry, filteredRegion } = useContext(CountriesContext);

  const skeletonArray = Array.from({length: 4}, (value, index) => {
    return <SkeletonCard key={index} />
  });
  
  return (
    <div className={isLoading ? "cards cards__skeleton" : "cards"}>
    {isLoading && <> {skeletonArray} </> } 
    {!isLoading && isError && <p className="cards__error">The request unfortunately failed. Please try later.</p>}
    {!isLoading && data && data
      .filter(country => country.name.toLowerCase().includes(searchedCountry.toLowerCase()))
      .filter(country => country.region.toLowerCase().includes(filteredRegion.toLowerCase()))
      .map(({
        alpha3Code,
        name,
        flags,
        population,
        region,
        capital
      }) => {
      return (
        <Card
          key={alpha3Code}
          name={name}
          flags={flags}
          population={population}
          region={region}
          capital={capital}
          alpha3Code={alpha3Code}
        />)
      }
    )}
    </div>
  );
};

export default Cards;