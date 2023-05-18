import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext';

interface Border {
  borderCode: string,
  borderName: string
}

const CountriesList = ({ borderCode, borderName }: Border) => {

  const { theme } = useContext(ThemeContext);

  return(
    <>
      <Link to={`/country/${borderCode}`}>
        <button 
          className={theme === "dark" ? "country__details--button country__details--button--dark" : "country__details--button"}
          type="button"
          data-testid="border"
        >
          {borderName}
        </button>
      </Link>
    </>
  );
};

export default CountriesList;