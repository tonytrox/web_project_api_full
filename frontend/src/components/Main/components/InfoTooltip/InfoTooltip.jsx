import Popup from "../Popup/Popup";
import successCheck from "../../../../images/checkSuccess.svg";
import errorCheck from "../../../../images/checkError.svg";

const InfoTooltip = ({ onClose, isSuccess, errorMessage }) => {
  return (
    <Popup onClose={onClose}>
      <img
        className="popup__icon-check"
        src={isSuccess ? successCheck : errorCheck} // logo de éxito o error
        alt="logo"
      />
      <span className="popup__message-check">
        {isSuccess ? "¡Correcto! Ya estás registrado." : errorMessage}
      </span>
    </Popup>
  );
};

export default InfoTooltip;
