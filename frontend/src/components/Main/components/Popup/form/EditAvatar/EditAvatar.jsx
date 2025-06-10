import { useRef, useContext } from "react";
import { CurrentUserContext } from "../../../../../../contexts/CurrentUserContext";

export default function EditAvatar() {
  const avatarRef = useRef();
  const { handleUpdateAvatar } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <form
      className="form"
      id="form_add-element"
      onSubmit={handleSubmit}
      noValidate
    >
      <>
        <input
          ref={avatarRef}
          className="form__avatar-link popup__input"
          id="form__image-link"
          type="url"
          name="link"
          placeholder="Enlace de la imagen"
          required
        />
        <span className="popup__error form__image-link-error"></span>
        <button className="popup__button form__save-button" id="save_avatar">
          Guardar
        </button>
      </>
    </form>
  );
}
