import { useEffect } from "react";
import { connect } from "react-redux";
import { createPortal } from "react-dom";
import { onEditCancel } from "../../redux/contacts/contacts-actions";
import styles from "./EditModal.module.scss";
import ContactEditForm from "../ContactEditForm";

const modalRoot = document.querySelector("#edit-modal");

const EditModal = ({ onEditCancel }) => {
  const onBackdropCLickHandle = (event) => {
    if (event.target === event.currentTarget) {
      onEditCancel();
    }
  };

  const onEscapeCloseHandle = (event) => {
    if (event.code === "Escape") {
      onEditCancel();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onEscapeCloseHandle);

    return () => {
      window.removeEventListener("keydown", onEscapeCloseHandle);
    };
  }, []);

  return createPortal(
    <div onClick={onBackdropCLickHandle} className={styles.Overlay}>
      <div className={styles.Modal}>
        <ContactEditForm />
      </div>
    </div>,
    modalRoot
  );
};

const mapDispatchToProps = {
  onEditCancel: onEditCancel,
};

export default connect(null, mapDispatchToProps)(EditModal);
