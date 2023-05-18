import React, { useState, useContext } from 'react';
import { CountriesContext } from '../../context/countriesContext';
import { ThemeContext } from '../../context/themeContext';
import Filter from './Filter';
import { IoSearch } from 'react-icons/io5';
import { IconContext } from 'react-icons/lib';

import './style.scss';

const SearchBar = () => {

  const { getSearchedCountry } = useContext(CountriesContext);
  const { theme } = useContext(ThemeContext);

  const [inputValue, setInputValue] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
    getSearchedCountry(e.target.value);
  };

  const classNames = theme === "dark" ? "search-bar__form--icon search-bar__form--icon--dark" : "search-bar__form--icon";

  return (
    <div className="search-bar">
      <form className="search-bar__form">
        <input
          className={theme === "dark" ? "search-bar__form--input search-bar__form--input--dark" : "search-bar__form--input"}
          type="text"
          placeholder="Search for a country..."
          value={inputValue}
          onChange={handleOnChange}
        />
        <IconContext.Provider value={{
          className: classNames
        }}>
          <IoSearch  />
        </IconContext.Provider>
      </form>
      <Filter />
    </div>
  );
};

export default SearchBar;