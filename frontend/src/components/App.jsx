// HOOKs
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { useNavigate } from "react-router-dom";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute";
import { register, authorization, getUserInfoEmail } from "../utils/auth";
import InfoTooltip from "./Main/components/InfoTooltip/InfoTooltip";

function App() {
  const navigate = useNavigate(); // hook para redirecciones programáticas dentro de funciones.

  const [currentUser, setCurrentUser] = useState(null); // estado del usuario actual
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [jwt, setJwt] = useState(""); // estado para almacenar el token JWT
  const [infoPopupOpen, setInfoPopupOpen] = useState(false);
  const [infoSuccess, setInfoSuccess] = useState(false);
  const [infoErrorMessage, setInfoErrorMessage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleOpenPopup(popup) {
    if (popup.link) {
      setSelectedCard(popup);
    } else {
      setPopup(popup);
    }
  }

  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null);
    setInfoPopupOpen(false);
  }

  // Función para actualizar el perfil del usuario
  const handleUpdateUser = (data) => {
    (async () => {
      await api
        .updateProfile(data.name, data.description)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) =>
          console.error(
            "Error al actualizar el perfil del usuario:",
            error.message || error
          )
        );
    })();
  };

  // Función para actualizar el avatar del usuario
  const handleUpdateAvatar = (data) => {
    (async () => {
      await api
        .updateAvatar(data.avatar)
        .then((newData) => {
          setCurrentUser(newData);
          handleClosePopup();
        })
        .catch((error) =>
          console.error(
            "Error al actualizar el avatar:",
            error.message || error
          )
        );
    })();
  };

  // Función que agrega una nueva tarjeta
  const handleAddPlaceSubmit = async (name, link) => {
    try {
      const newCard = await api.postCard(name, link);
      // Añadir la nueva tarjeta al inicio sin modificar la lista existente
      setCards([newCard, ...cards]);
      handleClosePopup();
    } catch (error) {
      console.error("Error al agregar la tarjeta:", error.message || error);
    }
  };

  const handleInfoClose = () => {
    setInfoPopupOpen(false);
    navigate("/signin");
  };

  // cerrar sesion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Limpiar el token del localStorage
    setJwt(""); // Limpiar el estado del token
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/signin");
  };

  // Función para manejar el registro de usuario
  const handleSignUp = (email, password) => {
    register(email, password)
      .then((response) => {
        setInfoPopupOpen(true);
        if (response.error) {
          setInfoSuccess(false);
          setInfoErrorMessage(response.error);
        } else {
          setInfoSuccess(true);
          setInfoErrorMessage("");
        }
      })
      .catch((error) => {
        console.error("Error en el registro", error.message || error);
      });
  };

  // Función para manejar el inicio de sesión
  const handleSignIn = (email, password) => {
    authorization(email, password)
      .then(async (response) => {
        // Esperamos que la respuesta se convierta en formato JSON para poder leerla como un objeto
        const responseJson = await response.json();
        // Verificamos si la respuesta no fue exitosa
        if (!response.ok) {
          setInfoPopupOpen(true);
          setInfoSuccess(false);
          setInfoErrorMessage(responseJson.message); // Mostramos el mensaje de error recibido desde el backend
        } else {
          // caso contrario, si la respuesta fue exitosa
          setJwt(responseJson.token); // Guardamos el token que nos envió el backend
          localStorage.setItem("token", responseJson.token); // lo guardamos en el localStorage del navegador
        }
      })
      .catch((error) => {
        console.error("Error durante la autenticación", error);
      });
  };

  // Comprueba si le han dado like a la tarjeta
  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    // Envía una solicitud a la API y obtiene la tarjeta actualizada
    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch(
        console.error(
          "Error al cambiar el estado del like:",
          error.message || error
        )
      );
  }

  async function handleCardDelete(cardId) {
    try {
      // espera a que la API elimine la tarjeta y devuelve la respuesta
      const responseCard = await api.deleteCard(cardId);

      // Aquí verificamos si la operación fue exitosa, revisando la propiedad "ok"
      if (responseCard.ok) {
        // Filtra las tarjetas para eliminar la que coincida con el ID
        setCards((state) => state.filter((card) => card._id !== cardId));
      }
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error.message || error);
    }
  }

  // useEffect, obtiene la información del usuario y lo guarda en el estado: currentUser
  useEffect(() => {
    const jwtToken = localStorage.getItem("token");

    if (!jwtToken) {
      return;
    }

    async function getInitialData() {
      try {
        const data = await api.getUserInfo();
        const responseEmail = await getUserInfoEmail();
        const cards = await api.getInitialCards();

        setCurrentUser({
          ...data,
          ...responseEmail.data,
        });

        setCards(cards);
        setIsLoggedIn(true);
        navigate("/");
      } catch (error) {
        console.error(
          "Error al obtener la información del usuario:",
          error.message || error
        );
      }
    }
    if (jwtToken) {
      getInitialData();
    }
  }, [jwt]); // se ejecuta el useEffect cada vez que JWT cambia

  return (
    // Paso 2: Proveer el Contexto
    // Proveedor del contexto, pasamos el valor del usuario actual y las funciones de actualización
    <CurrentUserContext.Provider
      value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
    >
      <Routes>
        {/* renderiza los componentes basados en la ruta */}
        <Route path="/signin" element={<Login handleSignIn={handleSignIn} />} />
        <Route
          path="/signup"
          element={<Register handleSignUp={handleSignUp} />}
        />
        {/* Ruta principal */}
        <Route
          path="/"
          element={
            // Si el usuario está logueado, renderiza el componente Main
            // Si no, redirige a la página de inicio de sesión (logica de ProtectedRoute)
            <div>
              <Header handleLogout={handleLogout} />
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  selectedCard={selectedCard}
                  popup={popup}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onAddPlace={handleAddPlaceSubmit}
                />
              </ProtectedRoute>
              <Footer />
            </div>
          }
        />
      </Routes>
      {infoPopupOpen && (
        <InfoTooltip
          // onClose={handleClosePopup}
          onClose={handleInfoClose}
          // isSuccess={true}
          isSuccess={infoSuccess}
          // errorMessage="error de inicio de sesion"
          errorMessage={infoErrorMessage}
        />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
