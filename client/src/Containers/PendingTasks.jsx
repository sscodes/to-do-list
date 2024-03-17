import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ButtonComponent from '../Components/ButtonComponent';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Task from '../Components/Task';
import { readTask } from '../actions/taskActions';

const PendingTasks = () => {
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

  return (
    <>
      <Header />
      <Container className='pt-3'>
        <Row>
          {tasks.map((task) => (
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
