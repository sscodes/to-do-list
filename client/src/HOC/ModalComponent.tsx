import React from 'react';
import { Modal } from 'react-bootstrap';

const ModalComponent = ({ children, show, onHide, fullscreen }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      fullscreen={fullscreen}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
