import 'bootstrap/dist/css/bootstrap.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddTask from '../Components/AddTask';
import ButtonComponent from '../Components/ButtonComponent';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import UpcomingDeadlines from '../Components/UpcomingDeadlines';

const Hero = () => {
  return (
    <>
      <Header />
      <Container className='py-5'>
        <Row>
          <Col className='mx-2 p-4 border border-dark-subtle border-3 rounded'>
            <AddTask />
          </Col>
          <Col className='mx-2 p-4 border border-dark-subtle border-3 rounded'>
            <UpcomingDeadlines />
          </Col>
        </Row>
        <Row className='py-4'>
          <Col>
            <Link
              to='/all-tasks'
              className='d-grid gap-2'
              style={{ textDecoration: 'none' }}
            >
              <ButtonComponent variant={'dark'} name={'All Tasks'} />
            </Link>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Hero;
