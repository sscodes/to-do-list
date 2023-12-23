import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/authActions';

const Profile = (props) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    Object.getOwnPropertyNames(state?.user?.user).length === 0
      ? state?.auth?.user
      : state?.user?.user
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

  const deleteUser = () => {};
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
        <Button onClick={deleteUser} variant='danger'>
          Delete User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Profile;
