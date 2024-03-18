import { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ButtonComponent from '../Components/ButtonComponent';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Task from '../Components/Task';
import { readTask } from '../actions/taskActions';
import SearchTask from '../Components/SearchTask';

const PendingTasks = () => {
  const [searchedText, setSearchedText] = useState('');
  const [tasksOnFilter, setTasksOnFilter] = useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) =>
    state.user.user.token ? state.user.user.token : state.auth.user.token
  );
  const tasks = useSelector((state) => state.tasks.tasks).filter(
    (task) => !task.done
  );

  useEffect(() => {
    dispatch(readTask(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchedText.length > 0) {
      const filteredTasks = tasks.filter((task) =>
        task.taskName.toLowerCase().includes(searchedText.toLowerCase())
      );
      setTasksOnFilter(filteredTasks);
    } else setTasksOnFilter([]);
  }, [searchedText]);

  const navigate = useNavigate();

  const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <Header />
      <Container className='pt-3'>
        <Row>
          <div className='d-flex justify-content-center pb-2'>
            <div style={{ width: '47%' }}>
              <SearchTask
                setSearchedText={setSearchedText}
                placeholder='Search Pending Tasks...'
              />
            </div>
          </div>
        </Row>
        <Row>
          {tasksOnFilter.length === 0 && searchedText.length !== 0 && (
            <div className='d-flex justify-content-center task-not-found'>
              <div className='border-2 border-black'>
                <h4
                  className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}
                >
                  No such task found...
                </h4>
                <div className='d-flex justify-content-center'>
                  <Button onClick={() => navigate('/')} variant='dark'>
                    Add tasks
                  </Button>
                </div>
              </div>
            </div>
          )}
          {tasksOnFilter.length === 0 && searchedText.length === 0
            ? tasks.map((task) => (
                <Col className='py-2' xs={12} sm={4} lg={3} key={task._id}>
                  <Task
                    id={task._id}
                    title={task.taskName}
                    details={task.taskDetail}
                    deadline={task.deadline}
                    variant='danger'
                    done={task.done}
                  />
                </Col>
              ))
            : tasksOnFilter.map((task) => (
                <Col className='py-2' xs={12} sm={4} lg={3} key={task._id}>
                  <Task
                    id={task._id}
                    title={task.taskName}
                    details={task.taskDetail}
                    deadline={task.deadline}
                    variant='danger'
                    done={task.done}
                  />
                </Col>
              ))}
        </Row>
        <Row className='py-3 pb-5'>
          <Col className='d-flex justify-content-center pb-5'>
            <Link to='/completed-tasks' style={{ textDecoration: 'none' }}>
              <ButtonComponent variant={'dark'} name={'Show Completed Tasks'} />
            </Link>
          </Col>
        </Row>
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default PendingTasks;
