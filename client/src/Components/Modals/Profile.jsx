import { ArcElement } from 'chart.js';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../../HOC/ModalComponent';
import { logoutUser } from '../../actions/authActions';
import { deleteUser } from '../../actions/userActions';
import { useReadTask } from '../../services/tasks/tasks.data';

const Profile = ({ show, onHide }) => {
  Chart.register(ArcElement);
  const [doneTasks, setDoneTasks] = useState();
  const [pendingTasks, setPendingTasks] = useState();

  const [name, setName] = useState('');

  const dispatch = useDispatch();

  const user = useSelector((state) =>
    Object.getOwnPropertyNames(state?.user?.user).length === 0
      ? state?.auth?.user
      : state?.user?.user
  );
  const token = useSelector((state) =>
    state.user.user.token ? state.user.user.token : state.auth.user.token
  );

  const {
    tasks,
    isPending: isGetTasksPending,
    isError: isGetTasksError,
  } = useReadTask(token);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isGetTasksPending && !isGetTasksError) {
      setDoneTasks(
        tasks.length > 0 ? tasks.filter((task) => task.done).length : undefined
      );
      setPendingTasks(
        tasks.length > 0 ? tasks.filter((task) => !task.done).length : undefined
      );
    }
  }, [isGetTasksPending, isGetTasksError, tasks]);

  const userData = {
    labels: ['done', 'pending'],
    datasets: [
      {
        label: 'Count',
        data: [doneTasks, pendingTasks],
        backgroundColor: ['rgb(120,120,120)', 'rgb(24,24,24)'],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    setName(user.name);
  }, [user.name]);

  const logout = () => {
    dispatch(logoutUser());
  };

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete profile?'))
      dispatch(deleteUser(token));
  };

  const { theme } = useSelector((state) => state.theme);

  return (
    <ModalComponent show={show} onHide={onHide}>
      <Modal.Header
        className={`${theme === 'DARK' && 'task-header-dark'}`}
        closeButton
      >
        <Modal.Title id='contained-modal-title-vcenter'>
          <div className='h4'>{name}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
        className={`${theme === 'DARK' && 'task-body-dark'}`}
      >
        <div
          style={{
            width: 300,
            minHeight: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {tasks?.length > 0 ? (
            <div>
              <Pie data={userData} />
            </div>
          ) : (
            <div>
              <h5
                className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}
              >
                No tasks added.
              </h5>
              <Button onClick={() => navigate('/')} variant='dark'>
                Add tasks
              </Button>
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer className={`${theme === 'DARK' && 'task-header-dark'}`}>
        <Button onClick={logout} variant='dark'>
          Logout
        </Button>
        <Button onClick={onDelete} variant='danger'>
          Delete User
        </Button>
      </Modal.Footer>
    </ModalComponent>
  );
};

export default Profile;
