import { useState } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import ModalComponent from '../HOC/ModalComponent';
import '../Style/Checkbox.css';
import { changeTaskDoneStatus, deleteTaskAction } from '../actions/taskActions';

const Task = (props) => {
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) =>
    state.user.user.token ? state.user.user.token : state.auth.user.token
  );

  function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
  }

  const changeDoneStatus = () => {
    const change = {
      done: !props.done,
    };
    dispatch(changeTaskDoneStatus(change, token, props.id));
  };

  const deleteTask = () => {
    dispatch(deleteTaskAction(token, props.id));
    setDeleteTaskModal(false);
  };

  const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <ModalComponent show={deleteTaskModal} onHide={setDeleteTaskModal}>
        <Modal.Header
          className={`${theme === 'DARK' && 'task-header-dark'}`}
          closeButton
        >
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
          <Button variant='dark' onClick={() => setDeleteTaskModal(false)}>
            No
          </Button>
          <Button variant='outline-dark' onClick={deleteTask}>
            Yes
          </Button>
        </Modal.Footer>
      </ModalComponent>
      <Card
        style={{ width: '97%', height: '100%', border: '0.15rem solid black' }}
      >
        <Card.Header className={`${theme === 'DARK' && 'task-header-dark'}`}>
          <Row>
            <Col xs={10}>{props.title}</Col>
            <Col xs={2}>
              <MdDelete
                style={{ cursor: 'pointer' }}
                onClick={() => setDeleteTaskModal(true)}
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body
          className={`${theme === 'DARK' && 'task-body-dark task-body-border'}`}
        >
          <Card.Text>{props.details}</Card.Text>
          <b>Deadline:</b> {formatDate(props.deadline)}
          <Row>
            <Col className='text-center'>
              <Row className='d-block align-middle align-items-center mt-4 border py-1 border rounded border-dark text-dark'>
                <Form.Check
                  type='checkbox'
                  id='default-checkbox'
                  defaultChecked={props.done}
                  onChange={changeDoneStatus}
                  className='d-inline'
                />
                <div className='d-inline mt-5 fs-6 fs-lg-5'>
                  Mark as {props.done ? `pending` : `done`}
                </div>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Task;
