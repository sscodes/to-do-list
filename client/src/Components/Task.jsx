import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { BiSolidEditAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import ModalComponent from '../HOC/ModalComponent';
import '../Style/Checkbox.css';
import { updateTask, deleteTaskAction } from '../actions/taskActions';
import FormComponent from './FormComponent';
import { toast } from 'react-toastify';

const Task = (props) => {
  const [online, setOnline] = useState(navigator.onLine);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [details, setDetails] = useState(props.details);
  const [deadline, setDeadline] = useState('');
  const [showCalender, setShowCalender] = useState(false);
  const [dd, setdd] = useState('dd');
  const [mm, setmm] = useState('mm');
  const [yyyy, setyyyy] = useState('yyyy');

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      if (navigator.onLine) setOnline(true);
      else setOnline(false);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

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
    dispatch(updateTask(change, token, props.id));
  };

  const changeTask = (e) => {
    e.preventDefault();
    const change = {};
    if (title.length > 0) change.taskName = title;
    if (details.length > 0) change.taskDetail = details;
    if (deadline.length > 0) change.deadline = deadline;
    if (online) dispatch(updateTask(change, token, props.id));
    else notifyError("Can't make changes when offline.");
    e.target.reset();
    setEditTaskModal(false);
  };

  const deleteTask = () => {
    dispatch(deleteTaskAction(token, props.id));
    setDeleteTaskModal(false);
  };

  const setDate = (e) => {
    setDeadline(e);
    const date = new Date(e);
    setdd(date.getDate().toString().padStart(2, '0'));
    setmm((date.getMonth() + 1).toString().padStart(2, '0'));
    setyyyy(date.getFullYear());
    setShowCalender(false);
  };

  const notificationProperties = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  };

  const notifyError = (error) => toast.error(error, notificationProperties);

  const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <ModalComponent show={editTaskModal} onHide={setEditTaskModal}>
        <Modal.Body
          className={`update-modal-body ${
            theme === 'DARK' && 'task-body-dark'
          }`}
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
          />
        </Modal.Body>
      </ModalComponent>
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
        style={{
          width: '97%',
          height: '100%',
          border: '0.15rem solid black',
          cursor: 'pointer',
        }}
      >
        <Card.Header className={`${theme === 'DARK' && 'task-header-dark'}`}>
          <Row>
            {!props.done ? (
              <>
                <Col xs={9}>{props.title}</Col>
                <Col xs={1}>
                  <BiSolidEditAlt
                    style={{ cursor: 'pointer' }}
                    onClick={() => setEditTaskModal(true)}
                  />
                </Col>
                <Col xs={1}>
                  <MdDelete
                    style={{ cursor: 'pointer' }}
                    onClick={() => setDeleteTaskModal(true)}
                  />
                </Col>
              </>
            ) : (
              <>
                <Col xs={10}>{props.title}</Col>
                <Col xs={2}>
                  <MdDelete
                    style={{ cursor: 'pointer' }}
                    onClick={() => setDeleteTaskModal(true)}
                  />
                </Col>
              </>
            )}
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
