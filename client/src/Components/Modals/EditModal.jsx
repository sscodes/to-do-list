import React from 'react';
import ModalComponent from '../../HOC/ModalComponent';
import { Modal } from 'react-bootstrap';
import FormComponent from '../FormComponent';
import { useSelector } from 'react-redux';

const EditModal = (props) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <ModalComponent show={props.editTaskModal} onHide={props.setEditTaskModal}>
      <Modal.Body
        className={`update-modal-body ${theme === 'DARK' && 'task-body-dark'}`}
      >
        <FormComponent
          submitTask={props.changeTask}
          title={props.title}
          details={props.details}
          setTitle={props.setTitle}
          setDetails={props.setDetails}
          setDate={props.setDate}
          showCalender={props.showCalender}
          setShowCalender={props.setShowCalender}
          dd={props.dd}
          mm={props.mm}
          yyyy={props.yyyy}
          buttonTitle='Update Task'
          border={props.true}
        />
      </Modal.Body>
    </ModalComponent>
  );
};

export default EditModal;
