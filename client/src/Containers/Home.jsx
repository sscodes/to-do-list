import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Signin from '../Components/Signin';
import Signup from '../Components/Signup';

const Home = () => {
  return (
    <>
      <Header />
      <Container className='py-5'>
        <Row className='py-3 text-center'>
          <h1>A no-nonsense to-do list app.</h1>
        </Row>
        <Row className='py-4'>
          <Col className='mx-2 p-4 border border-dark-subtle border-3 rounded'>
            <Signup />
          </Col>
          <Col className='mx-2 p-4 border border-dark-subtle border-3 rounded'>
            <Signin />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
