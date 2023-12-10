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
  const tasks = [
    {
      id: 1,
      title: 'Title 1',
      details: 'details',
      deadline: '07-12-23',
      done: false,
    },
    {
      id: 2,
      title: 'Title 2',
      details: 'details',
      deadline: '07-12-23',
      done: false,
    },
  ];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readTask());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let tasks1 = useSelector((state) => state.task.tasks);

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
                id={task.id}
                title={task.title}
                details={task.details}
                deadline={task.deadline}
                variant='danger'
                done={task.done}
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
