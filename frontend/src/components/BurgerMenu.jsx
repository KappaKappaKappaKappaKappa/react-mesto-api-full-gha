function BurgerMenu({ email, onClickLogout, isOpen }) {
  return (
    <div className={`burger-menu ${isOpen ? "burger-menu_active" : ""}`}>
      <div className="burger-menu__container">
        <p className="burger-menu__email">{email}</p>
        <button className="burger-menu__link" onClick={onClickLogout}>
          Выйти
        </button>
      </div>
    </div>
  );
}

export default BurgerMenu;
