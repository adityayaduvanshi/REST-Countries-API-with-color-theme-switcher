import { useContext } from 'react';
import { Routes, Route} from 'react-router-dom';
import Header from '../Header';
import SearchBar from '../SearchBar';
import Cards from '../Cards';
import Country from '../Country';
import { ThemeContext } from '../../context/themeContext';

import './style.scss';

const App = () => {

  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme === "dark" ? "app app--dark" : "app"}>
      <Header />
        <Routes>
          <Route 
            path="/"
            element={
            <>
              <SearchBar />
              <Cards />
            </>
          }
          />
          <Route path="/country/:code" element={<Country />}/> 
        </Routes>
    </div>
  );
}

export default App;
