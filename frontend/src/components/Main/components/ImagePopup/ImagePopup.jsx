export default function ImagePopup(props) {
  const { onClose, card } = props;

  return (
    <div className={`popup ${card ? "popup_opened" : ""}`} id="popup-image">
      <div className="popup__container-images">
        <button
          className="popup__exit-button"
          type="button"
          id="form__exit-button"
          onClick={onClose}
        ></button>
        {card && ( // Mostrar la imagen solo si hay una tarjeta seleccionada
          <>
            <img className="popup__image" src={card.link} alt={card.name} />
            <h3 className="popup__text">{card.name}</h3>
          </>
        )}
      </div>
    </div>
  );
}
