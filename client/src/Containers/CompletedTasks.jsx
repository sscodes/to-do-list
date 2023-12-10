import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Task from '../Components/Task';

const CompletedTasks = () => {
    const tasks = [
      {
        id: 1,
        title: 'Title 1',
        details: 'details',
        deadline: '07-12-23',
        done: true,
      },
      {
        id: 2,
        title: 'Title 2',
        details: 'details',
        deadline: '07-12-23',
        done: true,
      },
    ];
  return (
    <>
      <Header />
      <Container className='py-5'>
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

export default CompletedTasks;
