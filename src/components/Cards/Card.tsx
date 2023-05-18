import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext';
import { Countries } from '../../interfaces/types';

interface country {
  name: Countries["name"],
  flags: Countries["flags"]
  population: Countries["population"],
  region: Countries["region"],
  capital: Countries["capital"],
  alpha3Code: Countries["alpha3Code"]
}

const Card = ({ 
  name,
  flags,
  population,
  region,
  capital,
  alpha3Code
}: country,
) => {

  const { theme } = useContext(ThemeContext);

  return (
    <div className="cards__infos" data-testid="cards__infos">
      <Link to={`/country/${alpha3Code}`}>
        <div 
          className= "cards__flag"
        >
          <img src={flags.png} alt="country flag" aria-label={name} />
        </div>
        <div className={theme === "dark" ? "cards__content cards__content--dark":"cards__content"}>
          <h3 className="cards__content--title">{name}</h3>
          <div className="cards__content--details">
            <p><span>Population: </span>{population.toLocaleString("en-US")}</p>
            <p><span>Region: </span>{region}</p>
            <p><span>Capital: </span>{capital}</p>
          </div>
        </div>  
      </Link>
    </div>
  );
};


export default Card;