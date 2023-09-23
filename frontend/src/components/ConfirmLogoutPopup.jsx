import PopupWithForm from "./PopupWithForm";

function ConfirmLogoutPopup({ isOpen, onClose, onSubmit, onCloseMenu }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
    onCloseMenu();
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="logout-confirm"
      isOpen={isOpen}
      onClose={onClose}
      textBtnSave="Да"
      onSubmit={handleSubmit}
    />
  );
}

export default ConfirmLogoutPopup;
