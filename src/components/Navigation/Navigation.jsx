import { NavLink } from 'react-router-dom';
import style from './Navigation.module.css';

const Navigation = () => {
  return (
    <div className={style.navContainer}>
      <nav className={style.navigation}>
        <NavLink className={style.navLink} to="/">
          Home
        </NavLink>
        <NavLink className={style.navLink} to="/movies">
          Movies
        </NavLink>
      </nav>
    </div>
  );
};

export default Navigation;
