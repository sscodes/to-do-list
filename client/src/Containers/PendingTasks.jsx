import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    dispatch(readTask(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Container className='py-5'>
        <Row className='pb-5'>
          <Col className='d-flex justify-content-center'>
            <Link
              to='/completed-tasks'
              className='d-grid gap-2'
              style={{ textDecoration: 'none' }}
            >
              <ButtonComponent variant={'dark'} name={'Show Completed Tasks'} />
            </Link>
          </Col>
        </Row>
        <Row>
          <Col>
            {tasks.map((task) => (
              <Task
                id={task._id}
                title={task.taskName}
                details={task.taskDetail}
                deadline={task.deadline}
                variant='danger'
                done={task.done}
                key={task._id}
              />
            ))}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default PendingTasks;
