import { useEffect, useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import '../Style/Checkbox.css';
import { updateTask } from '../actions/taskActions';
import { formatDate } from '../utils/formDate';
import DeleteModal from './Modals/DeleteModal';
import EditModal from './Modals/EditModal';
import TaskDetails from './Modals/TaskDetails';

const Task = (props) => {
  const [online, setOnline] = useState(navigator.onLine);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
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

  const changeDoneStatus = (e) => {
    setShowTaskModal(false);
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
      <TaskDetails
        show={showTaskModal}
        onHide={setShowTaskModal}
        title={props.title}
        details={props.details}
        deadline={props.deadline}
        done={props.done}
      />
      <EditModal
        editTaskModal={editTaskModal}
        setEditTaskModal={setEditTaskModal}
        changeTask={changeTask}
        title={title}
        details={details}
        setTitle
        setDetails={setDetails}
        setDate={setDate}
        showCalender={showCalender}
        setShowCalender={setShowCalender}
        dd={dd}
        mm={mm}
        yyyy={yyyy}
      />
      <DeleteModal
        setDeleteTaskModal={setDeleteTaskModal}
        deleteTaskModal={deleteTaskModal}
        title={props.title}
        deadline={props.deadline}
      />
      <Card
        className='card-styling'
        onClick={() => setShowTaskModal((e) => !e)}
      >
        <Card.Header className={`${theme === 'DARK' && 'task-header-dark'}`}>
          <Row>
            {!props.done ? (
              <>
                <Col xs={9}>
                  {props.title.length > 11
                    ? props.title.slice(0, 11) + '...'
                    : props.title}
                </Col>
                <Col xs={1}>
                  <BiSolidEditAlt
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditTaskModal(true);
                    }}
                  />
                </Col>
                <Col xs={1}>
                  <MdDelete
                    style={{ cursor: 'pointer' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTaskModal(true);
                    }}
                  />
                </Col>
              </>
            ) : (
              <>
                <Col xs={10}>
                  {props.title.length > 11
                    ? props.title.slice(0, 11) + '...'
                    : props.title}
                </Col>
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
          <Card.Text>
            {props.details.length > 24
              ? props.details.slice(0, 24) + '...'
              : props.details}
          </Card.Text>
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
