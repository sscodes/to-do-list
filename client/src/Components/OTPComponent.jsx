import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import ButtonComponent from './ButtonComponent';

const ForgotPaswordComponent = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [OTP, setOTP] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (email) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [email]);

  const sendOTP = (e) => {
    e.preventDefault();
    const otp = Math.floor(100000 + Math.random() * 900000);
    
    // send that number over mail
    // check that with OTP
    setEmailSent(true);
    e.target.reset();
  };

  const confirmOTP = () => {};

  return (
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
  );
};

export default ForgotPaswordComponent;
