export default function Card(props) {
  const { handleOpenPopup, onCardLike, onCardDelete } = props;
  const { name, link, _id, isLiked } = props.card;

  // Creando objeto con la imagen seleccionada
  const imageComponent = {
    name: name,
    link: link,
  };

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? "element__like-button_active" : ""
  }`;

  function handleLikeClick() {
    onCardLike(props.card); // Llamar a onCardLike pasando la tarjeta como argumento
  }

  function handleDeleteClick() {
    onCardDelete(_id); // Llamar a onCardDelete pasando el id de la tarjeta como argumento
  }

  return (
    <>
      <li className="element__card">
        <div className="element__container">
          <img
            className="element__img"
            src={link}
            alt={name}
            onClick={() => handleOpenPopup(imageComponent)}
          />
          <div className="element__description">
            <h2 className="element__text">{name}</h2>
            <div className="element__container-like">
              <button
                className={cardLikeButtonClassName}
                type="button"
                onClick={handleLikeClick}
              ></button>
              {/* <p className="element__counter">{likes.length}</p> */}
            </div>
            <button
              className="element__remove-button"
              type="button"
              onClick={handleDeleteClick}
            ></button>
          </div>
        </div>
      </li>
    </>
  );
}
