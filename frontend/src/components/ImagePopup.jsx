import { useClosePopup } from "../hooks/useClosePopup";

function ImagePopup({ card, onClose, isOpen }) {
  useClosePopup(isOpen, onClose);
  return (
    <section
      className={`pop-up pop-up_show_zoom-card ${
        isOpen ? "pop-up_opened" : ""
      }`}
    >
      {card && (
        <div className="pop-up__container pop-up__container_open_image">
          <div
            className="pop-up__image"
            style={{ backgroundImage: `url(${card.link})` }}
          ></div>
          <h2 className="pop-up__card-name">{card.name}</h2>
          <button
            className="pop-up__button-close"
            type="button"
            onClick={onClose}
          ></button>
        </div>
      )}
    </section>
  );
}

export default ImagePopup;
