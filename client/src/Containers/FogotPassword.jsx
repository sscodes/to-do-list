import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../Components/Footer';
import ForgotPasswordComponent from '../Components/ForgotPasswordComponent';
import Header from '../Components/Header';
import OTPComponent from '../Components/OTPComponent';
import { useSelector } from 'react-redux';

const FogotPassword = () => {
  const [email, setEmail] = useState();
  
  const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <Header />
      <Container className='py-5'>
        <Row className='py-3 text-center'>
          <h4 className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}>
            Forgot password?
          </h4>
        </Row>
        <Row>
          <Col></Col>
          <Col className='p-3 border border-dark-subtle border-3 rounded'>
            {email ? (
              <ForgotPasswordComponent email={email} />
            ) : (
              <OTPComponent setEmailProp={setEmail} type={'forgotpassword'} />
            )}
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default FogotPassword;
