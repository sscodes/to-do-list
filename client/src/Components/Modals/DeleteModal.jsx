import React from 'react';
import ModalComponent from '../../HOC/ModalComponent';
import { Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/formDate';
import { useDeleteTask } from '../../services/tasks/tasks.data';

const DeleteModal = (props) => {
  const token = useSelector((state) =>
    state.user.user.token ? state.user.user.token : state.auth.user.token
  );
  const { theme } = useSelector((state) => state.theme);

  const { mutateAsync: deleteTaskAction } = useDeleteTask();

  const deleteTask = async () => {
    await deleteTaskAction({ token, id: props.id });
    props.setDeleteTaskModal(false);
  };

  return (
    <ModalComponent
      show={props.deleteTaskModal}
      onHide={props.etDeleteTaskModal}
      fullscreen={false}
    >
      <Modal.Header className={`${theme === 'DARK' && 'task-header-dark'}`}>
        <Modal.Title id='contained-modal-title-vcenter'>
          {props.title}
          <h6>
            <b>Deadline:</b> {formatDate(props.deadline)}
          </h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`${theme === 'DARK' && 'task-body-dark'}`}>
        <h4>Are you sure you want to delete this task?</h4>
      </Modal.Body>
      <Modal.Footer className={`${theme === 'DARK' && 'task-body-dark'}`}>
        <Button variant='dark' onClick={() => props.setDeleteTaskModal(false)}>
          No
        </Button>
        <Button variant='outline-dark' onClick={deleteTask}>
          Yes
        </Button>
      </Modal.Footer>
    </ModalComponent>
  );
};

export default DeleteModal;
