import { useEffect, useContext } from 'react';
import { useQuery } from 'react-query';
import { getCountryData, getBorders } from '../Api';
import { Link, useParams } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { IconContext } from 'react-icons/lib';
import { Countries } from '../../interfaces/types'
import Spinner from '../Spinner';
import CountriesList from './CountriesList';

import './style.scss';

const Country = () => {

  const { theme } = useContext(ThemeContext);

  // Get URL params
  const { code } = useParams<"code">();

  const { isLoading, isError, data, refetch } = useQuery<Countries>('countryInfos', () => getCountryData(`https://restcountries.com/v2/alpha/${code}`));

  useEffect(() => {
    if (data) {
      refetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, code]);

  const bordersCountry: string = data?.borders?.toString() || "";

  const { isLoading: loading, data: borders, refetch: refetchBorders } = useQuery<Countries[]>('borders', () => getBorders(`https://restcountries.com/v2/alpha?codes=${bordersCountry}`),
    {
      enabled: !!data?.borders
    }
  );

  const getBordersCountry = borders?.map(bordersInfos => {
    return (
       <CountriesList
         key={bordersInfos?.alpha3Code}
         borderCode={bordersInfos?.alpha3Code}
         borderName={bordersInfos?.name}
       />
     );
  });

  useEffect(() => {
    if (data?.borders) {
      refetchBorders()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.borders])

  return(
      <div className="country">
        <Link to="/">
          <button
            className={theme === "dark" ? "country__button country__button--dark" : "country__button"}
            type="button"
          >
            <IconContext.Provider value={{
              className: "country__button--icon"
            }}>
                <HiArrowNarrowLeft />
            </IconContext.Provider>
            <span>
              Back
            </span>
          </button>
        </Link>
        {isLoading && <Spinner />}
        {!isLoading && isError && <p className="country__error">The request unfortunately failed. Please try later.</p>}
        {!isLoading && !loading && data && (
        <div className="country__section">
          <div className="country__flag">
            <img src={data.flags.svg} alt="flag country" />
          </div>
          <div className="country__details">
            <h3 className="country__details--title">{data.name}</h3>
            <div className="country__details--elements">
          <div>
          <p><span>Native Name: </span>{data.nativeName}</p>
          <p><span>Population: </span>{data.population.toLocaleString("en-US")}</p>
          <p><span>Region: </span>{data.region}</p>
          <p><span>Sub Region: </span>{data.subregion}</p>
          <p><span>Capital: </span>{data.capital}</p>
          </div>
          <div>
            <p><span>Top Level Domain: </span>{data.topLevelDomain}</p>
            <p><span>Currencies: </span>{data.currencies?.map(currency => currency.name).join(', ')}</p>
            <p><span>Languages: </span>{data.languages.map(language => language.name).join(', ')}</p>
          </div> 
          </div>
          <div className="country__details--list">
            <div>
              <p><span>Border Countries: </span></p>
            </div>
          <div>
        {data.borders && data.borders.length > 0 ? getBordersCountry : <p>{data?.name} has no border countries</p>}
        </div>
        </div>
      </div>
      </div>
     )}
    </div>
  )
};

export default Country;