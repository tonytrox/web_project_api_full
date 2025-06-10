import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext"; // importamos el contexto

import Popup from "./components/Popup/Popup";
import EditAvatar from "./components/Popup/form/EditAvatar/EditAvatar";
import NewCard from "./components/Popup/form/NewCard/NewCard";
import EditProfile from "./components/Popup/form/EditProfile/EditProfile";
import Card from "./components/Card/Card";
import ImagePopup from "./components/ImagePopup/ImagePopup";

export default function Main(props) {
  const {
    selectedCard,
    popup,
    onOpenPopup,
    onClosePopup,
    cards,
    onCardLike,
    onCardDelete,
    onAddPlace,
  } = props;

  // Paso 3: Hacer uso del usuario actual derivado del contexto.
  const { currentUser } = useContext(CurrentUserContext);

  // Define los popups que se mostrarán en la interfaz
  const NewCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onAddPlace={onAddPlace} />,
  };
  const EditProfilePopup = {
    title: "Editar perfil",
    children: <EditProfile />,
  };
  const EditAvatarPopup = {
    title: "Editar avatar",
    children: <EditAvatar />,
  };

  return (
    <main className="content">
      <section className="profile">
        <div className="avatar__container">
          <img
            className="avatar__image"
            src={currentUser?.avatar}
            // Este operador permite acceder a la propiedad avatar de currentUser solo si currentUser no es null ni undefined. Si currentUser es null o undefined, la expresión devuelve undefined en lugar de lanzar un error.
            alt="profile avatar"
          ></img>
          <div
            onClick={() => {
              onOpenPopup(EditAvatarPopup);
            }}
            className="avatar__edit-button"
            type="button"
          ></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser?.name}</h1>
          <button
            className="profile__edit-button"
            type="botton"
            onClick={() => {
              onOpenPopup(EditProfilePopup);
            }}
          ></button>
          <h2 className="profile__description">{currentUser?.about}</h2>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={() => {
            onOpenPopup(NewCardPopup);
          }}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              // props de Card
              key={card._id}
              card={card}
              handleOpenPopup={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
      {popup && ( // Si popup es true, renderiza el componente Popup
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
      <ImagePopup card={selectedCard} onClose={onClosePopup} />
    </main>
  );
}
