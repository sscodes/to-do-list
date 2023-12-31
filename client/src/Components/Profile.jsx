import { ArcElement, Chart } from 'chart.js';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { deleteUser } from '../actions/userActions';

const Profile = (props) => {
  Chart.register(ArcElement);
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
  const tasks = useSelector((state) => state.tasks?.tasks);
  const doneTasks = tasks.filter((task) => task.done).length;
  const pendingTasks = tasks.filter((task) => !task.done).length;

  const userData = {
    labels: ['done', 'pending'],
    datasets: [
      {
        label: 'Count',
        data: [doneTasks, pendingTasks],
        backgroundColor: ['rgb(120,120,120)', 'rgb(24,24,24)'],
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
    dispatch(deleteUser(token));
  };
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ width: 300 }}>
          <div>
            <Pie data={userData} />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={logout} variant='dark'>
          Logout
        </Button>
        <Button onClick={onDelete} variant='danger'>
          Delete User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Profile;
