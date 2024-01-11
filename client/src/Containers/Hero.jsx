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
      <Container className='pb-5 pb-lg-0 py-lg-3'>
        <Row className='mt-3 mt-lg-0'>
          <Col lg={1} className='d-none d-lg-block'></Col>
          <Col lg={5} className='mx-lg-1 p-3 border border-dark-subtle border-3 rounded'>
            <AddTask />
          </Col>
          <Col lg={5} className='mx-lg-1 mt-2 mt-lg-0 p-3 border border-dark-subtle border-3 rounded'>
            <UpcomingDeadlines />
          </Col>
          <Col lg={1} className='d-none d-lg-block'></Col>
        </Row>
        <Row className='pb-5 pb-lg-0 mt-3 mt-lg-0 py-lg-2'>
          <Col className='d-flex justify-content-center'>
            <Link
              to='/pending-tasks'
              style={{ textDecoration: 'none' }}
            >
              <ButtonComponent variant={'dark'} name={'Show Pending Tasks'} />
            </Link>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Hero;
