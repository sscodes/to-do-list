import { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';

interface ModalComponentProps {
  children: ReactNode;
  show: boolean;
  onHide: () => void;
  fullscreen?: boolean;
}

const ModalComponent = ({
  children,
  show,
  onHide,
  fullscreen = false,
}: ModalComponentProps) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      fullscreen={fullscreen ? true : 'sm-down'}
    >
      {children}
    </Modal>
  );
};

export default ModalComponent;
