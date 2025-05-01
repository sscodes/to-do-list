import {
  FormEvent,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
// import { useSelector } from 'react-redux';
import { ToastContentProps, toast } from 'react-toastify';
import '../Style/Checkbox.css';
import { formatDate, notificationProperties } from '../utils/formDate';
import DeleteModal from './Modals/DeleteModal';
import EditModal from './Modals/EditModal';
import TaskDetails from './Modals/TaskDetails';
import { useUpdateTask } from '../services/tasks/tasks.data';
import { TaskChanges } from '@/types/tasks';
import { Value as DateValue } from 'node_modules/react-calendar/dist/esm/shared/types';

interface TaskProps {
  id: string;
  title: string;
  details: string;
  deadline: DateValue;
  done: boolean;
}

const Task = ({
  id,
  title: titleProp,
  details: detailsProp,
  deadline: deadlineProp,
  done,
}: TaskProps) => {
  const [online, setOnline] = useState(navigator.onLine);
  const [deleteTaskModal, setDeleteTaskModal] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [title, setTitle] = useState(titleProp);
  const [details, setDetails] = useState(detailsProp);
  const [deadline, setDeadline] = useState<DateValue>();
  const [showCalender, setShowCalender] = useState(false);
  const [dd, setdd] = useState('dd');
  const [mm, setmm] = useState('mm');
  const [yyyy, setyyyy] = useState('yyyy');
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (title.length > 0 && deadline) setDisableBtn(false);
    else setDisableBtn(true);
  }, [title, deadline]);

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

  const { mutateAsync: updateTask } = useUpdateTask();

  const token = JSON.parse(localStorage.getItem('auth') as string)?.token;

  const changeDoneStatus = async () => {
    setShowTaskModal(false);
    const change = {
      done: !done,
    };
    await updateTask({ change, token, id: id });
  };

  const changeTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const change: TaskChanges = {};
    if (title.length > 0) change.taskName = title;
    if (details.length > 0) change.taskDetail = details;
    if (!!deadline) change.deadline = deadline;
    if (online) updateTask({ change, token, id: id });
    else notifyError("Can't make changes when offline.");
    (e.target as HTMLFormElement).reset();
    setEditTaskModal(false);
  };

  const setDate = (value: DateValue) => {
    setDeadline(value);
    if (value) {
      const selectedDate = Array.isArray(value) ? value[0] : value;
      setDeadline(selectedDate);
      if (selectedDate) {
        setdd(selectedDate?.getDate().toString().padStart(2, '0'));
        setmm((selectedDate?.getMonth() + 1).toString().padStart(2, '0'));
        setyyyy(selectedDate?.getFullYear().toString());
      }
      setShowCalender(false);
    }
  };

  const notifyError = (
    error:
      | string
      | number
      | boolean
      | ReactElement<any, string | JSXElementConstructor<any>>
      | Iterable<ReactNode>
      | ((props: ToastContentProps<unknown>) => ReactNode)
      | null
      | undefined
  ) => toast.error(error, notificationProperties);

  // const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <TaskDetails
        show={showTaskModal}
        onHide={setShowTaskModal}
        title={titleProp}
        details={detailsProp}
        deadline={deadlineProp}
      />
      <EditModal
        editTaskModal={editTaskModal}
        setEditTaskModal={setEditTaskModal}
        changeTask={changeTask}
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
        disableBtn={disableBtn}
      />
      <DeleteModal
        setDeleteTaskModal={setDeleteTaskModal}
        deleteTaskModal={deleteTaskModal}
        title={titleProp}
        deadline={deadlineProp}
        id={id}
      />
      <Card
        className='card-styling'
        onClick={() => setShowTaskModal((e) => !e)}
      >
        <Card.Header
        // className={`${theme === 'DARK' && 'task-header-dark'}`}
        >
          <Row>
            {!done ? (
              <>
                <Col xs={9} className='h4'>
                  {titleProp.length > 11
                    ? titleProp.slice(0, 11) + '...'
                    : titleProp}
                </Col>
                <Col xs={1}>
                  <BiSolidEditAlt
                    style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditTaskModal(true);
                    }}
                  />
                </Col>
                <Col xs={1}>
                  <MdDelete
                    style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTaskModal(true);
                    }}
                  />
                </Col>
              </>
            ) : (
              <>
                <Col xs={10} className='h4'>
                  {titleProp.length > 11
                    ? titleProp.slice(0, 11) + '...'
                    : titleProp}
                </Col>
                <Col xs={2}>
                  <MdDelete
                    style={{ cursor: 'pointer', fontSize: '1.2rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTaskModal(true);
                    }}
                  />
                </Col>
              </>
            )}
          </Row>
        </Card.Header>
        <Card.Body
        // className={`${theme === 'DARK' && 'task-body-dark task-body-border'}`}
        >
          <Card.Text style={{ fontSize: '1.2rem' }}>
            {detailsProp.length > 24
              ? detailsProp.slice(0, 24) + '...'
              : detailsProp}
          </Card.Text>
          <b className='h6'>Deadline:</b>{' '}
          <span className='h6'>{formatDate(deadlineProp)}</span>
          <Row>
            <Col className='text-center'>
              <Row className='d-block align-middle align-items-center mt-4 border py-1 border rounded border-dark text-dark'>
                <Form.Check
                  type='checkbox'
                  id='default-checkbox'
                  defaultChecked={done}
                  onChange={changeDoneStatus}
                  className='d-inline'
                />
                <div className='d-inline mt-5 fs-6 fs-lg-5'>
                  Mark as {done ? `pending` : `done`}
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
