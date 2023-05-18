import { useContext } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { ThemeContext } from "../../context/themeContext";

import './style.scss';

const Spinner = () => {

  const { theme } = useContext(ThemeContext);

  return (
    <div className="spinner">
      <FadeLoader
        speedMultiplier={2}
        color={theme === "dark" ? "#FFFFFF" : "#98A6A2"}
        height={15}
      />
      <p className="spinner__text">Loading...</p>
    </div>
  )
};

export default Spinner;
