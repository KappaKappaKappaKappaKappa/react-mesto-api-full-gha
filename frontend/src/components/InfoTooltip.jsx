import successRegister from "../images/success-register.svg";
import errorRegister from "../images/error-register.svg";

function InfoTooltip({ isConfirmed, isOpen, onClose, successText, errorText }) {
  return (
    <section className={`pop-up ${isOpen ? "pop-up_opened" : ""}`}>
      <div className="pop-up__container">
        <form className="pop-up__form">
          <div className="pop-up__tooltip-container">
            <img
              className="pop-up__tooltip-img"
              src={isConfirmed ? successRegister : errorRegister}
              alt="Картинка подтверждения\ошибки регистрации"
            />
            <h2 className="pop-up__tooltip-title">
              {isConfirmed ? successText : errorText}
            </h2>
          </div>
        </form>
        <button className="pop-up__button-close" onClick={onClose}></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
