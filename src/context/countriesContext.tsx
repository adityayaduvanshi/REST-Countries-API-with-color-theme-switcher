import { createContext, useState, ReactNode } from 'react';
import { useQuery } from 'react-query';
import { loadData } from '../components/Api';
import { Countries } from '../interfaces/types';

interface AllCountriesContext {
  data?: Countries[],
  isLoading: boolean,
  isError: boolean,
  getSearchedCountry: (value: string) => void;
  searchedCountry: string,
  getFilteredRegion: (value: string) => void;
  filteredRegion: string,
}

const defaultState = {
  data: [],
  isLoading: false,
  isError: false,
  getSearchedCountry: () => {},
  searchedCountry: "",
  getFilteredRegion: () => {},
  filteredRegion: ""
}

export const CountriesContext = createContext<AllCountriesContext>(defaultState);

export const CountriesContextProvider = ({ children }: {children: ReactNode}) => {

  const [searchedCountry, setSearchedCountry] = useState('');
  const [filteredRegion, setFilteredRegion] = useState('');

  const { isLoading, isError, data } = useQuery<Countries[]>('countriesInfos', () => loadData('https://restcountries.com/v2/all'));

  const getSearchedCountry = (value: string):void => {
    setSearchedCountry(value)
  };

  const getFilteredRegion = (value: string):void => {
    if (value !== "All") {
    setFilteredRegion(value)
    } else {
      setFilteredRegion("")
    }
  };

  return (
    <CountriesContext.Provider value={{
      data, 
      isLoading,
      isError,
      getSearchedCountry,
      searchedCountry,
      getFilteredRegion,
      filteredRegion
    }}>
      {children}
    </CountriesContext.Provider>
  )
};