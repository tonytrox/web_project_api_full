import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login({ handleSignIn }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(data);
    handleSignIn(data.email, data.password);
  };

  const handleOnChange = (e) => {
    setData((prev) => ({
      // usar 'prev' garantiza que estás usando el valor más reciente del estado almacenado
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Header />
      <div className="login">
        <h1 className="login__welcome">Inicia sesión</h1>
        <form className="login__form">
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
            className="login__button"
            onClick={handleSubmit}
          >
            Iniciar sesión
          </button>
        </form>
        <div className="login__signup">
          <p className="login__question-text">¿Aún no eres miembro?</p>
          <Link to="/signup" className="login__register-link">
            Regístrate aquí
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
