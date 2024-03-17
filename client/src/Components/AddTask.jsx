import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { createTask } from '../actions/taskActions';
import ButtonComponent from './ButtonComponent';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MdDateRange } from 'react-icons/md';

const AddTask = () => {
  const [online, setOnline] = useState(navigator.onLine);
  const [showCalender, setShowCalender] = useState(false);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [deadline, setDeadline] = useState('');
  const [dd, setdd] = useState('dd');
  const [mm, setmm] = useState('mm');
  const [yyyy, setyyyy] = useState('yyyy');

  const dispatch = useDispatch();
  const user = useSelector((state) =>
    Object.getOwnPropertyNames(state?.user?.user).length === 0
      ? state?.auth?.user
      : state?.user?.user
  );
  const token = useSelector((state) =>
    state.user.user.token ? state.user.user.token : state.auth.user.token
  );

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

  const notifySuccess = (msg) => toast.success(msg, notificationProperties);

  const submitTask = (e) => {
    e.preventDefault();
    const task = {
      user: user._id,
      taskName: title,
      taskDetail: details,
      deadline: deadline,
      done: false,
    };
    if (online) dispatch(createTask(task, token));
    else {
      localStorage.setItem('task', JSON.stringify(task));
      notifySuccess(
        'Task saved! It will be uploaded once we go online. Kindly do not logout.'
      );
    }
    e.target.reset();
  };

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

  const setDate = (e) => {
    setDeadline(e);
    const date = new Date(e);
    setdd(date.getDate().toString().padStart(2, '0'));
    setmm((date.getMonth() + 1).toString().padStart(2, '0'));
    setyyyy(date.getFullYear());
    setShowCalender(false);
  };

  return (
    <div>
      <h4>Add a task:</h4>
      <Form onSubmit={submitTask}>
        <Form.Group className='mb-1'>
          <Form.Label>Task Title:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Add Task'
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-1'>
          <Form.Label>Task Description (optional):</Form.Label>
          <Form.Control
            as='textarea'
            placeholder='Descrbe the task...'
            rows={3}
            onChange={(e) => setDetails(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3' style={{ position: 'relative' }}>
          <Form.Label>Set deadline:</Form.Label>
          <div
            className='date-field'
            onClick={() => setShowCalender((e) => !e)}
          >
            {`${dd}/${mm}/${yyyy}`} <MdDateRange />
          </div>
          <div className='calender'>
            {showCalender && <Calendar onChange={setDate} value={new Date()} />}
          </div>
        </Form.Group>
        <div className='d-grid gap-2'>
          <ButtonComponent
            type={'submit'}
            variant={'dark'}
            name={'Add Tasks'}
          />
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddTask;
