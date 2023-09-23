import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({
  isOpen,
  onClose,
  onSubmit,
  card,
  isPreloading,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(card);
  };

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-submit"
      textBtnSave={isPreloading ? "Удаляем..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
export default ConfirmDeletePopup;
