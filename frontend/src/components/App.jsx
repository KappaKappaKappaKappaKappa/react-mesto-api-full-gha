import React, { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ImagePopup from "./ImagePopup.jsx";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import ConfirmDeletePopup from "./ConfirmDeletePopup.jsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";
import ConfirmLogoutPopup from "./ConfirmLogoutPopup";

function App() {
  //Создание стейт-переменных открытия-закрытия popup'ов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopup, setIsConfirmDeletePopup] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmLogoutPopup, setIsConfirmLogoutPopup] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [isRegister, setIsRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState("");

  //Стейт переменная отслеживания открытия/закрытия бургер-меню
  const [isClickBurgerMenu, setIsClickBurgerMenu] = useState(false);

  const navigate = useNavigate();

  const successTextInfoTooltip = "Вы успешно зарегистрировались!";
  const errorTextInfoTooltip = "Что-то пошло не так! Попробуйте ещё раз.";

  //Создание стейта текущего пользователя
  const [currentUser, setCurrentUser] = useState({
    name: "Загружаем...",
    about: "Загружаем...",
  });

  //Создание стейта карточек
  const [cards, setCards] = useState([]);

  //Создание стейта выбранной карточки
  const [selectedCard, setSelectedCard] = useState(null);

  //Создание стейта выбранной карточки для удаления
  const [cardToDelete, setCardToDelete] = useState(null);

  //Создание стейта индикатора загрузки данных
  const [isPreloading, setIsPreloading] = useState(false);

  //Получение данных текущего пользователя и получение карточек
  useEffect(() => {
    if (isLoggedIn) {
      api
        .getInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((error) => {
          console.log(error);
        });

      api
        .getCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isLoggedIn]);

  //Проверка токена при загрузке страницы
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          setEmail(data.data.email);
          handleLoggedIn();
          navigate("/main");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  //Функция обновления стейт-переменной выбранной карточки
  const handleCardClick = (card) => {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  };

  const handleCardLike = (card) => {
    //Проверка наличия лайка на карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //Запрос обновленных данных карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Функция обработчик нажатия на открытие popup
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  // Функция обработчик нажатия на открытие popup
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  // Функция обработчик нажатия на открытие popup
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  // Функция закрытия всех popup'ов
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmDeletePopup(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard(null);
    setIsConfirmLogoutPopup(false);
  };
  //Функция отправки и обновления данных пользователя
  const handleUpdateUser = (newUserData) => {
    setIsPreloading(true);
    api
      .setUserInfo(newUserData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsPreloading(false);
      });
  };
  //Функция отправки и обновления аватара
  const handleUpdateAvatar = (newUserAvatar) => {
    setIsPreloading(true);
    api
      .setNewAvatar(newUserAvatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsPreloading(false);
      });
  };
  //Функция отправки и добавления новой карточки
  const handleAddPlaceSubmit = (newCard) => {
    setIsPreloading(true);
    api
      .addCard(newCard)
      .then((newCards) => {
        setCards([newCards, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsPreloading(false);
      });
  };

  //Функция показа PopupConfirm и установка карточки в стейт переменную
  const handleClickCardDeleteBtn = (card) => {
    setIsConfirmDeletePopup(true);
    setCardToDelete(card);
  };

  //Функция удаления карточки и обновления стейта
  const handleCardDelete = () => {
    setIsPreloading(true);
    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        const updateCards = cards.filter((c) => c._id !== cardToDelete._id);
        setCards(updateCards);
        setIsConfirmDeletePopup(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSelectedCard(null);
        setIsPreloading(false);
      });
  };

  //Функция открытия InfoTooltip popup
  const handleInfoTooltipOpen = () => {
    setIsInfoTooltipOpen(true);
  };

  //Обработчик регистрации пользователя
  const handleRegister = (password, email) => {
    auth
      .handleRegisterUser(password, email)
      .then((res) => {
        if (res) {
          setIsRegister(true);
          handleInfoTooltipOpen();
          navigate("/sign-in");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsRegister(false);
        handleInfoTooltipOpen();
      });
  };

  //Обработчик авторизации пользователя
  const handleLogin = (password, email) => {
    auth
      .handleLoginUser(password, email)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          handleLoggedIn();
          localStorage.setItem("token", data.token);
          navigate("/main");
        }
      })
      .catch((err) => {
        setIsRegister(false);
        handleInfoTooltipOpen();
        console.log(err);
      });
  };

  //Функция изменения стейт переменной статуса логина пользователя
  const handleLoggedIn = () => {
    setIsLoggedIn(true);
  };

  //Функция выхода из системы
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/sign-in");
    setIsConfirmLogoutPopup(false);
  };

  //Функция обработчик нажатия на кнопку выхода
  const handleClickLogoutBtn = () => {
    setIsConfirmLogoutPopup(true);
  };

  //Функция открытия бургер-меню
  const handleClickMenuBtn = () => {
    setIsClickBurgerMenu(true);
  };

  //Функция закрытия бургер-меню
  const handleCloseMenu = () => {
    setIsClickBurgerMenu(false);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <Header
          email={email}
          onClickLogout={handleClickLogoutBtn}
          isLoggedIn={isLoggedIn}
          isOpen={isClickBurgerMenu}
          onClickMenuBtn={handleClickMenuBtn}
          onCloseMenu={handleCloseMenu}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />

          <Route
            path="*"
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onClickCardDeleteBtn={handleClickCardDeleteBtn}
              />
            }
          ></Route>
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isPreloading={isPreloading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isPreloading={isPreloading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isPreloading={isPreloading}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopup}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          card={selectedCard}
          isPreloading={isPreloading}
        />
        <ConfirmLogoutPopup
          isOpen={isConfirmLogoutPopup}
          onClose={closeAllPopups}
          onSubmit={handleLogout}
          onCloseMenu={handleCloseMenu}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />

        <InfoTooltip
          isConfirmed={isRegister}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          successText={successTextInfoTooltip}
          errorText={errorTextInfoTooltip}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;