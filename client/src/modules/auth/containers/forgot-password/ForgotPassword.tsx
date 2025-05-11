import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import ForgotPasswordComponent from '../../components/forgot-password/ForgotPasswordComponent';
import OTPComponent from '../../components/otp/OTPComponent';
import classes from './ForgotPassword.module.css';
import clsx from 'clsx';
import { OTP_SRC } from '@/helpers/types';
import { ASSETS } from '@/helpers/assets';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  // const { theme } = useSelector((state) => state.theme);

  const token = JSON.parse(localStorage.getItem('auth') as string)?.token;

  if (token) {
    return <Navigate to={`/home`} />;
  }

  return (
    <Container className=''>
      <Row className='py-5 border border-1 rounded rounded-4 p-5 bg-white shadow'>
        <Col xs={6} className='d-flex align-items-center'>
          <div>
            <div className='tm-font-primary'>
              <h4 className={'fw-bold'}>Forgot password?</h4>
              <h6 className={'tm-text-primary'}>
                Don't worry, happens with the best of us!
              </h6>
            </div>
            <div className={clsx(classes.forgotPwd, 'mt-4')}>
              {email ? (
                <ForgotPasswordComponent email={email} />
              ) : (
                <OTPComponent
                  setEmailProp={setEmail}
                  type={OTP_SRC.FORGOT_PASSWORD}
                />
              )}
            </div>
          </div>
        </Col>
        <Col xs={6} className='d-flex justify-content-start'>
          <SVG src={ASSETS.illustrations.forgotPassword} height={320} title='React' />
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
