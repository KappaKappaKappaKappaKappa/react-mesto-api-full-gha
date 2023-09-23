import { React, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import { useFormValidation } from "../hooks/useFormValidation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isPreloading }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation({});

  //Подписываемся на контекст
  const currentUser = useContext(CurrentUserContext);

  //Обработчик сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values);
  };

  //Сброс формы
  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      textBtnSave={isPreloading ? "Обновляем..." : "Сохранить"}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input
        className={
          errors.name
            ? "pop-up__form-input pop-up__form-input_input_name pop-up__form-input_type_error"
            : "pop-up__form-input pop-up__form-input_input_name"
        }
        id="name-input"
        name="name"
        type="text"
        required
        minLength="2"
        maxLength="40"
        placeholder="Укажите имя"
        onChange={handleChange}
        value={values.name || ""}
      />
      <span
        className={"pop-up__form-input-error"}
      >
        {errors.name}
      </span>
      <input
        className={
          errors.about
            ? "pop-up__form-input pop-up__form-input_input_profession pop-up__form-input_type_error"
            : "pop-up__form-input pop-up__form-input_input_profession"
        }
        id="profession-input"
        name="about"
        type="text"
        required
        minLength="2"
        maxLength="200"
        placeholder="Укажите чем вы занимаетесь"
        onChange={handleChange}
        value={values.about || ""}
      />
      <span className="pop-up__form-input-error">
        {errors.about}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
