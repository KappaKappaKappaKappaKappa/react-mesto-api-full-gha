import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";
import menuBtn from "../images/burger-menu-icon.svg";
import closeMenuBtn from "../images/close-burger-menu-icon.svg";
import BurgerMenu from "./BurgerMenu";
import { useEffect } from "react";

function Header({
  email,
  onClickLogout,
  isLoggedIn,
  isOpen,
  onClickMenuBtn,
  onCloseMenu,
}) {
  const location = useLocation();

  const scrollThreshold = 142;

  const handleScroll = () => {
    if (window.scrollY >= scrollThreshold) {
      onCloseMenu();
    }
  };

  window.addEventListener("scroll", handleScroll);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767 && isOpen) {
        onCloseMenu();
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);
  return (
    <>
      {isLoggedIn && (
        <BurgerMenu
          email={email}
          onClickLogout={onClickLogout}
          isOpen={isOpen}
        />
      )}
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип" />
        {location.pathname === "/main" && (
          <div className="header__wrapper">
            <p className="header__user-email">{email}</p>
            <button className="header__logout" onClick={onClickLogout}>
              Выйти
            </button>
          </div>
        )}

        {location.pathname === "/sign-in" && (
          <Link className="header__auth-link" to="/sign-up">
            Регистрация
          </Link>
        )}
        {location.pathname === "/sign-up" && (
          <Link className="header__auth-link" to="/sign-in">
            Войти
          </Link>
        )}
        {isLoggedIn && !isOpen && (
          <img
            className="header__menu-btn"
            src={menuBtn}
            alt="Конопка меню"
            onClick={onClickMenuBtn}
          />
        )}
        {isLoggedIn && isOpen && (
          <img
            className="header__menu-btn"
            src={closeMenuBtn}
            alt="Кнопка закрытия меню"
            onClick={onCloseMenu}
          />
        )}
      </header>
    </>
  );
}

export default Header;
