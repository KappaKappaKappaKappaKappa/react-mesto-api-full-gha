import PopupWithForm from "./PopupWithForm";
import { React, useEffect } from "react";

import { useFormValidation } from "../hooks/useFormValidation";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  isPreloading,
}) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation({});

  //Обработчик сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(values);
  };

  //Сброс формы
  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-cards"
      isOpen={isOpen}
      onClose={onClose}
      textBtnSave={isPreloading ? "Создаем..." : "Сохранить"}
      onSubmit={handleSubmit}
      isDisabled={!isValid}
    >
      <input
        className={
          errors.title
            ? "pop-up__form-input pop-up__form-input_input_place pop-up__form-input_type_error"
            : "pop-up__form-input pop-up__form-input_input_place"
        }
        id="place-input"
        name="title"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        onChange={handleChange}
        value={values.title || ''}
      />
      <span className="pop-up__form-input-error">
        {errors.title}
      </span>
      <input
        className={
          errors.link
            ? "pop-up__form-input pop-up__form-input_input_link pop-up__form-input_type_error"
            : "pop-up__form-input pop-up__form-input_input_link"
        }
        id="link-input"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        onChange={handleChange}
        value={values.link || ''}
      />
      <span className="pop-up__form-input-error">
        {errors.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
