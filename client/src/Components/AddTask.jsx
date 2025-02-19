import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import FormComponent from './FormComponent';
import { useCreateTask } from '../services/tasks/tasks.data';

const AddTask = () => {
  const [online, setOnline] = useState(navigator.onLine);
  const [showCalender, setShowCalender] = useState(false);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [dd, setdd] = useState('dd');
  const [mm, setmm] = useState('mm');
  const [yyyy, setyyyy] = useState('yyyy');
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (title.length > 0 && deadline) setDisableBtn(false);
    else setDisableBtn(true);
  }, [title, deadline]);

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

  const { mutateAsync: createTask } = useCreateTask();

  const submitTask = async (e) => {
    e.preventDefault();
    const task = {
      user: user._id,
      taskName: title,
      taskDetail: details,
      deadline: deadline,
      done: false,
    };
    if (online) await createTask({ task, token });
    else {
      localStorage.setItem('task', JSON.stringify(task));
      notifySuccess('Task saved! It will be uploaded once we go online.');
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

  const { theme } = useSelector((state) => state.theme);

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
      <h4 className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}>
        Add a task:
      </h4>
      <FormComponent
        submitTask={submitTask}
        setTitle={setTitle}
        setDetails={setDetails}
        setDate={setDate}
        showCalender={showCalender}
        setShowCalender={setShowCalender}
        dd={dd}
        mm={mm}
        yyyy={yyyy}
        buttonTitle='Add Task'
        disableBtn={disableBtn}
      />
      <ToastContainer />
    </div>
  );
};

export default AddTask;
