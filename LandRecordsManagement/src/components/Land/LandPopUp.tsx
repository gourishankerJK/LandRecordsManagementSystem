import { FC } from "react";

import './landPop.scss';

interface ModalProps {
  selectedLand: any;
  closeModal: () => void;
  documentUrl: string;
  className? : string;
}

const Modal: FC<ModalProps> = ({ selectedLand, closeModal, documentUrl, className=""}) => {
  return (
    <div className={`modal ${className}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>{selectedLand.location.state} Land Document</h2>
        <p>
          This is the document for the land in{" "}
          {selectedLand.location.village}, {selectedLand.location.tehsil},{" "}
          {selectedLand.location.district}.
        </p>
        <img className="land-document" src={documentUrl} />
      </div>
    </div>
  );
};

export default Modal;
