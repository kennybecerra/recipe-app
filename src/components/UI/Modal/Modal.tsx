import React from "react";
import classes from "./Modal.module.scss";

interface ModalProps {
  show: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, toggleModal, children }) => {
  return (
    <div
      className={classes.Container}
      onClick={toggleModal}
      style={show ? { zIndex: "10", opacity: "1" } : {}}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          console.log("The modal was clicked");
        }}
        className={classes.Modal}
        style={show ? { transform: "translateY(0)" } : {}}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
