import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ModalComponent from '../../HOC/ModalComponent';
import { formatDate } from '../../utils/formDate';

const TaskDetails = (props) => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <ModalComponent show={props.show} onHide={props.onHide}>
      <Modal.Header className={`${theme === 'DARK' && 'task-header-dark'}`}>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body className={`${theme === 'DARK' && 'task-body-dark'}`}>
        <p>{props.details}</p>
        <b style={{ fontSize: '0.8rem' }}>
          This task needs to be completed by {formatDate(props.deadline)}
        </b>
      </Modal.Body>

      <Modal.Footer className={`${theme === 'DARK' && 'task-header-dark '}`}>
        <Button variant='secondary' onClick={() => props.onHide((e) => !e)}>
          Close
        </Button>
      </Modal.Footer>
    </ModalComponent>
  );
};

export default TaskDetails;
