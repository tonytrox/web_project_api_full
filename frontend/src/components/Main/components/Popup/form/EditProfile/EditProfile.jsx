import { useState, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditProfile() {
  const userContext = useContext(CurrentUserContext); // Obtiene el objeto currentUser
  const { currentUser, handleUpdateUser } = userContext;

  const [name, setName] = useState(currentUser.name); // Agrega la variable de estado para name
  const [description, setDescription] = useState(currentUser.about); // Agrega la variable de estado para description

  const handleNameChange = (event) => {
    setName(event.target.value); // Actualiza name cuando cambie la entrada
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value); // Actualiza description cuando cambie la entrada
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del envío de formularios

    handleUpdateUser({ name, description }); // Actualiza la información del usuario
  };

  return (
    <form
      className="form"
      id="form_edit-profile"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        className="form__name popup__input"
        id="form__name"
        type="text"
        name="name"
        placeholder="Nombre"
        maxLength="40"
        minLength="2"
        required
        value={name} // Vincula name con la entrada
        onChange={handleNameChange} // Agrega el controlador onChange
      />
      <span className="popup__error form__name-error"></span>
      <input
        className="form__description popup__input"
        id="form__description"
        type="text"
        name="description"
        placeholder="Descripción"
        maxLength="200"
        minLength="2"
        required
        value={description} // Vincula description con la entrada
        onChange={handleDescriptionChange} // Agrega el controlador onChange
      />
      <span className="popup__error form__description-error"></span>
      <button
        className="popup__button form__save-button"
        type="submit"
        id="save_profile"
      >
        Guardar
      </button>
    </form>
  );
}
