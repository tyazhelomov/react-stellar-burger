import ReactDOM from "react-dom";
import ModalElement from "../modal-element/modal-element";
import { funcPropType, modalInfoPropType } from "../../utils/prop-types";

const modalRoot = document.getElementById("modal");

const Modal = ({ modalInfo, closeModal }) => {
  return ReactDOM.createPortal(
      (
        <ModalElement modalInfo={modalInfo} closeModal={closeModal}/>
      ), 
      modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  modalInfo: modalInfoPropType,
  closeModal: funcPropType,
}; 
