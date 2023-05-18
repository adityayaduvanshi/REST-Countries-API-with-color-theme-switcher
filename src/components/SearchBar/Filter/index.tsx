import React, { useState, useContext } from 'react';
import { CountriesContext } from '../../../context/countriesContext';
import { ThemeContext } from '../../../context/themeContext';
import { IoIosArrowDown } from 'react-icons/io';
import { IconContext } from 'react-icons/lib';

import './style.scss';

const Filter = () => {

  const { getFilteredRegion } = useContext(CountriesContext);
  const { theme } = useContext(ThemeContext);

  const [isOpen, setIsOpen] = useState(false);
  const [region, setRegion] =  useState("");

  const handleOnClick = ():void => {
    setIsOpen(!isOpen);
  };

  const handleOnClickRegion = (e: React.MouseEvent):void => {
    const value = e.target as HTMLLIElement;
    getFilteredRegion(value.id);
    setRegion(value.id)
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <div className={theme === "dark" ? "filter filter--dark" : "filter"}>
        {region ? region : "Filter by Region"}
        <IconContext.Provider value={{
          className:"filter__icon"
        }}
        >
          <IoIosArrowDown onClick={handleOnClick} />
        </IconContext.Provider>
      </div>
      <div 
        className={isOpen ? "filter__select" : "filter__select--hide"}
      >
        <ul>
          <li id="All" className="filter__select--region" onClick={handleOnClickRegion}>All</li>
          <li id="Africa" className="filter__select--region" onClick={handleOnClickRegion}>Africa</li>
          <li id="Americas" className="filter__select--region" onClick={handleOnClickRegion}>Americas</li>
          <li id="Asia" className="filter__select--region" onClick={handleOnClickRegion}>Asia</li>
          <li id="Europe" className="filter__select--region" onClick={handleOnClickRegion}>Europe</li>
          <li id="Oceania" className="filter__select--region" onClick={handleOnClickRegion}>Oceania</li>
        </ul>
      </div>
    </div>
  );
};
export default Filter;