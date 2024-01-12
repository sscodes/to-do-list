import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { createUser } from '../actions/userActions';
import ButtonComponent from './ButtonComponent';
import Signup from './Signup';

const OTPComponent = ({ setEmailProp, user, type, emailProp }) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [OTP, setOTP] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const authenticated = useSelector((state) =>
    state.user.authenticated
      ? state.user.authenticated
      : state.auth.authenticated
  );

  useEffect(() => {
    if (email && navigator.onLine) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [email]);

  const notificationProperties = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  };

  const notifyError = (error) => toast.error(error, notificationProperties);
  const notifySuccess = (msg) => toast.success(msg, notificationProperties);

  const sendOTPMail = (email) => () => {
    fetch(`https://todolist-api.onrender.com/api/mails/${type}/sendOTP/${email}`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message);
          });
        } else return res.json();
      })
      .then((otp) => {
        localStorage.setItem('otp', JSON.stringify(otp));
        setEmailSent(true);
        notifySuccess(`OTP sent on ${email}`);
      })
      .catch((err) => {
        notifyError(err.message);
        setEmailSent(false);
      });
  };

  useEffect(() => {
    if (type === 'signup') {
      setEmail(emailProp);
      dispatch(sendOTPMail(emailProp));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendOTP = (e) => {
    e.preventDefault();
    dispatch(sendOTPMail(email));
    !emailSent && e.target.reset();
  };

  const confirmOTP = (e) => {
    e.preventDefault();
    // eslint-disable-next-line eqeqeq
    if (localStorage.getItem('otp') == OTP) {
      if (type === 'forgotpassword') {
        localStorage.clear();
        setEmailProp(email);
      } else {
        notifySuccess('Email Verified');
        dispatch(createUser(user));
      }
    } else notifyError('Wrong OTP entered.');
  };

  if (authenticated) {
    return <Navigate to={`/home`} />;
  }

  return type === 'forgotpassword' || emailSent ? (
    <>
      <Form onSubmit={emailSent ? confirmOTP : sendOTP}>
        <Form.Group className='mb-3'>
          <Form.Label>
            {emailSent ? 'Enter OTP' : 'Enter Email address'}
          </Form.Label>
          <Form.Control
            type={emailSent ? 'text' : 'email'}
            placeholder={emailSent ? 'Enter OTP' : 'name@example.com'}
            onChange={(e) =>
              emailSent ? setOTP(e.target.value) : setEmail(e.target.value)
            }
          />
          <u
            style={{
              fontSize: '0.9rem',
              paddingTop: '0.4rem',
              cursor: 'pointer',
            }}
            onClick={sendOTP}
          >
            {emailSent && 'Resend OTP'}
          </u>
        </Form.Group>
        <div className='d-grid gap-2'>
          <ButtonComponent
            variant={'dark'}
            name={emailSent ? 'Confirm OTP' : 'Reset Password'}
            disabled={buttonDisabled}
          />
        </div>
      </Form>
      <ToastContainer />
    </>
  ) : (
    <Signup />
  );
};

export default OTPComponent;
