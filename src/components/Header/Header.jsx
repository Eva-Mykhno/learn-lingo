import { NavLink } from "react-router-dom";
import clsx from "clsx";
import s from "./Header.module.css";

const sprite = "../../../public/sprite.svg";

const Header = () => {
  const buildLinkClassName = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <header className={clsx(s.header, "container")}>
      <div className={s.logo}>
        <svg height="28" width="28">
          <use href={`${sprite}#icon-ukraine`} />
        </svg>
        <span className={s.textLogo}>LearnLingo</span>
      </div>
      <nav className={s.nav}>
        <NavLink to="/" className={buildLinkClassName}>
          Home
        </NavLink>
        <NavLink to="/teachers" className={buildLinkClassName}>
          Teachers
        </NavLink>
        <NavLink to="/favorites" className={buildLinkClassName}>
          Favorites
        </NavLink>
      </nav>
      <div className={s.wrapLogin}>
        <button className={s.login}>
          <svg className={s.icon} height="20" width="20">
            <use href={`${sprite}#icon-log-in`} />
          </svg>
          <span className={s.text}>Log in</span>
        </button>
        <button className={s.register}>Registration</button>
      </div>
    </header>
  );
};

export default Header;
