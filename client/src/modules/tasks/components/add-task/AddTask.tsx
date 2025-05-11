import { FormEvent, useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
// import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useCreateTask } from '../../../../services/tasks/tasks.data';
import FormComponent from '../../../../components/form/FormComponent';
import { notificationProperties } from '@/utils/constants';
import { Value as DateValue } from 'node_modules/react-calendar/dist/esm/shared/types';
import useOnlineStatus from '@/hooks/useOnlineStatus';

const AddTask = () => {
  const [showCalender, setShowCalender] = useState(false);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [deadline, setDeadline] = useState<DateValue>(null);
  const [dd, setdd] = useState('dd');
  const [mm, setmm] = useState('mm');
  const [yyyy, setyyyy] = useState('yyyy');
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (title.length > 0 && deadline) setDisableBtn(false);
    else setDisableBtn(true);
  }, [title, deadline]);

  const user = JSON.parse(localStorage.getItem('auth') as string);
  const token = JSON.parse(localStorage.getItem('auth') as string)?.token;

  const notifySuccess = (msg: string) =>
    toast.success(msg, notificationProperties);

  const { mutateAsync: createTask } = useCreateTask();

  const { isOnline } = useOnlineStatus({});

  const submitTask = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task = {
      user: user._id,
      taskName: title,
      taskDetail: details,
      deadline: deadline,
      done: false,
    };
    if (isOnline) await createTask({ task, token });
    else {
      localStorage.setItem('task', JSON.stringify(task));
      notifySuccess('Task saved! It will be uploaded once we go online.');
    }
    (e.target as HTMLFormElement).reset();
  };

  // const { theme } = useSelector((state) => state.theme);

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

  return (
    <div>
      <h4
      // className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}
      >
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
