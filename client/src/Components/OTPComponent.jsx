import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import ButtonComponent from './ButtonComponent';

const OTPComponent = ({ setEmailProp }) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [OTP, setOTP] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (email) setButtonDisabled(false);
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
    fetch(`http://localhost:7000/api/mails/sendOTP/${email}`)
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
      .catch(() => {
        notifyError('No user found with this email id.');
        setEmailSent(false);
      });
  };

  const sendOTP = (e) => {
    e.preventDefault();
    dispatch(sendOTPMail(email));
    e.target.reset();
  };

  const confirmOTP = (e) => {
    e.preventDefault();
    // eslint-disable-next-line eqeqeq
    if (localStorage.getItem('otp') == OTP) {
      localStorage.clear();
      setEmailProp(email);
    } else notifyError('Wrong OTP entered.');
  };

  return (
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
  );
};

export default OTPComponent;
