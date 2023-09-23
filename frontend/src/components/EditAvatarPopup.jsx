import { React, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

import { useFormValidation } from "../hooks/useFormValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isPreloading }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation({});

  //Обработчик сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(values);
  };

  //Сброс формы
  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="new-avatar-form"
      isOpen={isOpen}
      onClose={onClose}
      textBtnSave={isPreloading ? "Обновляем..." : "Сохранить"}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input
        className={
          errors.avatar
            ? "pop-up__form-input pop-up__form-input_input_avatar-url pop-up__form-input_type_error"
            : "pop-up__form-input pop-up__form-input_input_avatar-url"
        }
        id="avatar-url-input"
        name="avatar"
        type="url"
        placeholder="Ссылка на новый аватар"
        required
        onChange={handleChange}
        value={values.avatar || ''}
      />
      <span className="pop-up__form-input-error">
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
