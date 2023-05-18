import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/themeContext';
import { HiOutlineMoon, HiMoon } from 'react-icons/hi';

import './style.scss';

const Header = () => {

  const { theme, toggleMode } = useContext(ThemeContext);

  return (
    <header className={theme === "dark" ? "header header--dark" : "header"}>
      <Link to="/">
        <div>
          <h2 className="header__title">Where in the world?</h2>
        </div>
      </Link>
      <div className="header__mode">
        {theme === "dark" ? <HiMoon /> : <HiOutlineMoon />}
        <button 
          className={theme === "dark" ? "header__button header__button--dark" : "header__button"}
          type="button"
          onClick={toggleMode}
        >
          Dark Mode
        </button>
      </div>
    </header>
  );
};

export default Header;