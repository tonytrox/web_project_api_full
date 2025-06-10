import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Register({ handleSignUp }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    handleSignUp(data.email, data.password);
  };

  const handleOnChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Header />
      <div className="register">
        <h1 className="register__welcome">Regístrate</h1>
        <form className="register__form">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={data.email}
            onChange={handleOnChange}
          />
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            value={data.password}
            onChange={handleOnChange}
          />
          <button
            type="submit"
            className="register__button"
            onClick={handleSubmit}
          >
            Regístrate
          </button>
        </form>
        <div className="register__signin">
          <p>¿Ya eres miembro? </p>
          <Link to="/signin" className="register__login-link">
            Inicia sesión aquí
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
