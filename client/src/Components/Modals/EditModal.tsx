import * as React from 'react';
import ModalComponent from '../../HOC/ModalComponent';
import { Modal } from 'react-bootstrap';
import FormComponent from '../FormComponent';
import { Value as DateValue } from 'node_modules/react-calendar/dist/esm/shared/types';
// import { useSelector } from 'react-redux';

interface EditModalProps {
  editTaskModal: boolean;
  setEditTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  changeTask: (e: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  details: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDetails: React.Dispatch<React.SetStateAction<string>>;
  setDate: (e: DateValue) => void;
  showCalender: boolean;
  setShowCalender: React.Dispatch<React.SetStateAction<boolean>>;
  dd: string;
  mm: string;
  yyyy: string;
  disableBtn: boolean;
}

const EditModal = ({
  editTaskModal,
  setEditTaskModal,
  changeTask,
  title,
  details,
  setTitle,
  setDetails,
  setDate,
  showCalender,
  setShowCalender,
  dd,
  mm,
  yyyy,
  disableBtn,
}: EditModalProps) => {
  // const { theme } = useSelector((state) => state.theme);
  const handleHide = () => {
    setEditTaskModal(false);
  };
  return (
    <ModalComponent show={editTaskModal} onHide={handleHide}>
      <Modal.Body
      // className={`update-modal-body ${theme === 'DARK' && 'task-body-dark'}`}
      >
        <FormComponent
          submitTask={changeTask}
          title={title}
          details={details}
          setTitle={setTitle}
          setDetails={setDetails}
          setDate={setDate}
          showCalender={showCalender}
          setShowCalender={setShowCalender}
          dd={dd}
          mm={mm}
          yyyy={yyyy}
          buttonTitle='Update Task'
          border={true}
          disableBtn={disableBtn}
        />
      </Modal.Body>
    </ModalComponent>
  );
};

export default EditModal;
