import { useState } from "react";

export default function NewCard(props) {
  const { onAddPlace } = props;

  const [name, setPlace] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(name, link);
  }

  return (
    <form
      className="form"
      id="form_add-element"
      onSubmit={handleSubmit}
      noValidate
    >
      <input
        className="form__place popup__input"
        id="form__place"
        type="text"
        name="place"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={(e) => setPlace(e.target.value)}
      />
      <span className="popup__error form__place-error"></span>
      <input
        className="form__image-link popup__input"
        id="form__image-link"
        type="url"
        name="link"
        placeholder="Enlace de la imagen"
        required
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="popup__error form__image-link-error"></span>
      <button className="popup__button form__save-button" id="save_place">
        Crear
      </button>
    </form>
  );
}
