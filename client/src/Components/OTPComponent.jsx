import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import ButtonComponent from './ButtonComponent';

const ForgotPaswordComponent = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (email) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [email]);

  const sendOTP = () => {
    setEmailSent(true);
  };

  const confirmOTP = () => {};

  return (
    <Form onSubmit={emailSent ? confirmOTP : sendOTP}>
      <Form.Group className='mb-3'>
        <Form.Label>{emailSent ? ${``} : ${`Enter Email address:`}}</Form.Label>
        <Form.Control
          type='email'
          placeholder='name@example.com'
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <div className='d-grid gap-2'>
        <ButtonComponent
          variant={'dark'}
          name={'Reset Password'}
          disabled={buttonDisabled}
        />
      </div>
    </Form>
  );
};

export default ForgotPaswordComponent;
