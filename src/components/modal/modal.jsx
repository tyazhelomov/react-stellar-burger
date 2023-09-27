import ReactDOM from "react-dom";
import { funcPropType, modalInfoPropType } from "../../utils/prop-types";

const modalRoot = document.getElementById("modal");

const Modal = ({children}) => {
  return ReactDOM.createPortal(
      (
        <>
          {children}
        </>
      ), 
      modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  modalInfo: modalInfoPropType,
  closeModal: funcPropType,
}; 
