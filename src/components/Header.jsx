import { Link } from "react-router-dom";
import whiteLogo from "../assets/whiteLogo.png";
import "../App.css";

const Header = () => {
  return (
    <header className="flex w-full items-center justify-between px-4 h-16 text-lg bg-slate-950 z-40 text-white">
      <Link to={`/`}>
        <img className="sm:w-28 w-24 xl:w-36 2xl:w-40" src={whiteLogo} alt="Logo" />
      </Link>
      <ul className="flex gap-4 sm:text-base text-sm">
        <Link to="/movie">
          <li>
            <button className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-indigo-100 rounded hover:bg-white group py-1 px-2">
              <span className="w-56 h-48 rounded bg-indigo-600 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-indigo-600 transition-colors duration-300 ease-in-out group-hover:text-white">
                Movies
              </span>
            </button>
          </li>
        </Link>
        <Link to="/tv">
          <li><button className="btn relative inline-flex items-center justify-start overflow-hidden font-medium transition-all bg-indigo-100 rounded hover:bg-white group py-1 px-2">
              <span className="w-56 h-48 rounded bg-indigo-600 absolute bottom-0 left-0 translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
              <span className="relative w-full text-left text-indigo-600 transition-colors duration-300 ease-in-out group-hover:text-white">
                TV Shows
              </span>
            </button></li>
        </Link>
      </ul>
    </header>
  );
};

export default Header;
