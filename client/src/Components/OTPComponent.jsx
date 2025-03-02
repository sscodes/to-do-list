import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ButtonComponent from './ButtonComponent';
import { useCreateUser, useSendOTPMail } from '../services/auth/auth.data';

const OTPComponent = ({ setEmailProp, user, type, emailProp }) => {
  const [email, setEmail] = useState('');
  const [OTP, setOTP] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const isAuthenticated = JSON.parse(localStorage.getItem('auth'))?.token
    ? true
    : false;
  console.log(JSON.parse(localStorage.getItem('auth')));
  const { mutateAsync: createUser } = useCreateUser();

  const { theme } = useSelector((state) => state.theme);

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

  const { otp, isSuccess, refetch } = useSendOTPMail(type, email);

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('otp', JSON.stringify(otp));
      notifySuccess(`OTP sent on ${email}`);
    }
  }, [isSuccess, otp]);

  useEffect(() => {
    if (type === 'signup') {
      setEmail(emailProp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmOTP = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('otp') == OTP) {
      if (type === 'forgotpassword') {
        localStorage.clear();
        setEmailProp(email);
      } else {
        notifySuccess('Email Verified');
        await createUser({ user });
      }
    } else notifyError('Wrong OTP entered.');
  };

  if (isAuthenticated) {
    return <Navigate to={`/home`} />;
  }

  return (
    <>
      <Form onSubmit={isSuccess ? confirmOTP : null}>
        <Form.Group className='mb-3'>
          <Form.Label
            className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}
          >
            {isSuccess ? 'Enter OTP' : 'Enter Email address'}
          </Form.Label>
          <Form.Control
            type={isSuccess ? 'text' : 'email'}
            placeholder={isSuccess ? 'Enter OTP' : 'name@example.com'}
            onChange={(e) =>
              isSuccess ? setOTP(e.target.value) : setEmail(e.target.value)
            }
            className={`${theme === 'DARK' && 'form-control-dark'}`}
          />
          <u
            style={{
              fontSize: '0.9rem',
              paddingTop: '0.4rem',
              cursor: 'pointer',
            }}
            onClick={refetch}
          >
            {isSuccess && 'Resend OTP'}
          </u>
        </Form.Group>
        <div className='d-grid gap-2'>
          <ButtonComponent
            variant={'dark'}
            name={isSuccess ? 'Confirm OTP' : 'Reset Password'}
            disabled={buttonDisabled}
          />
        </div>
      </Form>
      <ToastContainer />
    </>
  );
};

export default OTPComponent;
