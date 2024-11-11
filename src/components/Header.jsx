import { Link } from "react-router-dom";
import whiteLogo from '../assets/whiteLogo.png';
import "../App.css";

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between px-4 h-16 text-lg bg-slate-950 z-40 text-white">
      <Link to={`/`}>
        <img className="sm:w-28 w-20" src={whiteLogo} alt="Logo" />
      </Link>
      <ul className="flex gap-4 sm:text-base text-sm">
        <Link to="/movie">
          <li>
            Movies
          </li>
        </Link>
        <Link to="/tv">
          <li>
            TV Shows
          </li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
