import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../Components/Footer';
import ForgotPaswordComponent from '../Components/OTPComponent';
import Header from '../Components/Header';

const FogotPassword = () => {
  return (
    <>
      <Header />
      <Container className='py-5'>
        <Row className='py-3 text-center'>
          <h4>Forgot password?</h4>
        </Row>
        <Row>
          <Col></Col>
          <Col className='p-3 border border-dark-subtle border-3 rounded'>
            <ForgotPaswordComponent />
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default FogotPassword;
