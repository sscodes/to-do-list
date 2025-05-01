import React from 'react';
import ModalComponent from '../../HOC/ModalComponent';
import { Button, Modal } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import { formatDate } from '../../utils/formDate';
import { useDeleteTask } from '../../services/tasks/tasks.data';
import { Value as DateValue } from 'node_modules/react-calendar/dist/esm/shared/types';

interface DeleteModalProps {
  setDeleteTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTaskModal: boolean;
  title: string;
  deadline: DateValue;
  id: string;
}

const DeleteModal = ({
  setDeleteTaskModal,
  deleteTaskModal,
  title,
  deadline,
  id,
}: DeleteModalProps) => {
  const token = JSON.parse(localStorage.getItem('auth') as string)
    ?.token as string;
  // const { theme } = useSelector((state) => state.theme);

  const { mutateAsync: deleteTaskAction } = useDeleteTask();

  const deleteTask = async () => {
    await deleteTaskAction({ token, id });
    setDeleteTaskModal(false);
  };
  const handleHide = () => {
    setDeleteTaskModal(false);
  };

  return (
    <ModalComponent
      show={deleteTaskModal}
      onHide={handleHide}
      fullscreen={false}
    >
      <Modal.Header
      // className={`${theme === 'DARK' && 'task-header-dark'}`}
      >
        <Modal.Title id='contained-modal-title-vcenter'>
          {title}
          <h6>
            <b>Deadline:</b> {formatDate(deadline)}
          </h6>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
      // className={`${theme === 'DARK' && 'task-body-dark'}`}
      >
        <h4>Are you sure you want to delete this task?</h4>
      </Modal.Body>
      <Modal.Footer
      // className={`${theme === 'DARK' && 'task-body-dark'}`}
      >
        <Button variant='dark' onClick={() => setDeleteTaskModal(false)}>
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
