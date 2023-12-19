import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Task from '../Components/Task';

const CompletedTasks = () => {
  const tasks = useSelector((state) => state.tasks.tasks).filter(
    (task) => task.done
  );
  return (
    <>
      <Header />
      <Container className='py-5'>
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
      <ToastContainer />
    </>
  );
};

export default CompletedTasks;
