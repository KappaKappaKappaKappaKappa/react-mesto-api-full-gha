import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormValidation } from "../hooks/useFormValidation";

function Register({ onRegister }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormValidation({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values.password, values.email);
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className="login-register">
      <h2 className="login-register__title">Регистрация</h2>
      <form className="login-register__form" onSubmit={handleSubmit}>
        <input
          className={
            errors.email
              ? "login-register__input login-register__input_type_error"
              : "login-register__input"
          }
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
          type="email"
          required
          maxLength={40}
          value={values.email || ""}
        />
        <span className="login-register__input-error">{errors.email}</span>
        <input
          className={
            errors.password
              ? "login-register__input login-register__input_type_error"
              : "login-register__input"
          }
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
          type="password"
          required
          minLength={8}
          maxLength={40}
          value={values.password || ""}
        />
        <span className="login-register__input-error">{errors.password}</span>
        <button
          className={
            isValid
              ? "login-register__submit-btn"
              : "login-register__submit-btn login-register__submit-btn_inactive"
          }
          disabled={!isValid}
          type="submit"
        >
          Зарегистрироваться
        </button>
        <p className="login-register__already-title">
          Уже зарегестрированы?{" "}
          <Link to="/sign-in" className="login-register__already-login">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
