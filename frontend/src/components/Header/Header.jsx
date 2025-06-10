import logo from "../../images/logo_aroundus.svg";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { useLocation, Link } from "react-router-dom";

function Header({ handleLogout }) {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Around the U.S logo" />
      {currentUser ? (
        <>
          <span className="header__text">email: {currentUser.email}</span>
          <button className="header__button" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </>
      ) : location.pathname === "/signin" ? (
        <Link className="header__text" to="/signup">
          Registrate
        </Link>
      ) : (
        <Link className="header__text" to="/signin">
          Iniciar sesión
        </Link>
      )}
    </header>
  );
}

export default Header;
