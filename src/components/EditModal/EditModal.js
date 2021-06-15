import { Component } from "react";
import { connect } from "react-redux";
import { createPortal } from "react-dom";
import { onEditCancel } from "../../redux/contacts/contacts-actions";
import { getEditItem } from "../../redux/contacts/contacts-selectors";
import styles from "./EditModal.module.scss";
import ContactEditForm from "../ContactEditForm";

const modalRoot = document.querySelector("#edit-modal");

class EditModal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onEscapeCloseHandle);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscapeCloseHandle);
  }

  onBackdropCLickHandle = (event) => {
    if (event.target === event.currentTarget) {
      this.props.onEditCancel();
    }
  };

  onEscapeCloseHandle = (event) => {
    if (event.code === "Escape") {
      this.props.onEditCancel();
    }
  };

  render() {
    return createPortal(
      <div onClick={this.onBackdropCLickHandle} className={styles.Overlay}>
        <div className={styles.Modal}>
          <ContactEditForm />
        </div>
      </div>,
      modalRoot
    );
  }
}

const mapDispatchToProps = {
  onEditCancel: onEditCancel,
};

export default connect(null, mapDispatchToProps)(EditModal);
