import ModalComponent from '@/HOC/modal/ModalComponent';
import { useDeleteUser } from '@/services/auth/auth.data';
import { useReadTask } from '@/services/tasks/tasks.data';
import { ArcElement } from 'chart.js';
import Chart from 'chart.js/auto';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Pie } from 'react-chartjs-2';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface ProfileModalProps {
  show: boolean;
  onHide: () => void;
}

export const ProfileModal = ({ show, onHide }: ProfileModalProps) => {
  Chart.register(ArcElement);
  const [doneTasks, setDoneTasks] = useState<number | undefined>();
  const [pendingTasks, setPendingTasks] = useState<number | undefined>();
  const [name, setName] = useState('');

  const user = JSON.parse(localStorage.getItem('auth') as string);

  const { mutateAsync: deleteUser, isSuccess: isDeleteUserSuccess } =
    useDeleteUser();

  const token = JSON.parse(localStorage.getItem('auth') as string)?.token;
  const {
    tasks,
    isPending: isGetTasksPending,
    isError: isGetTasksError,
  } = useReadTask(token);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isGetTasksPending && !isGetTasksError && tasks) {
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
    if (isDeleteUserSuccess) {
      localStorage.clear();
      window.location.reload();
    }
  }, [isDeleteUserSuccess]);

  useEffect(() => {
    setName(user?.name);
  }, [user?.name]);

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const onDelete = async () => {
    if (window.confirm('Are you sure you want to delete profile?'))
      await deleteUser({ token, userId: user?._id });
  };

  // const { theme } = useSelector((state) => state.theme);

  return (
    <ModalComponent show={show} onHide={onHide}>
      <Modal.Header
        // className={`${theme === 'DARK' && 'task-header-dark'}`}
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
        // className={`${theme === 'DARK' && 'task-body-dark'}`}
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
              // className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}
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
      <Modal.Footer
      // className={`${theme === 'DARK' && 'task-header-dark'}`}
      >
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
