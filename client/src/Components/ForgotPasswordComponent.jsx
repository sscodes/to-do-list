import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import ButtonComponent from './ButtonComponent';

const ForgotPasswordComponent = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (password === '' || confirmPassword === '') setMessage(false);
    else if (password !== confirmPassword) setMessage(true);
    else setMessage(false);
  }, [password, confirmPassword]);

  useEffect(() => {
    if (password && confirmPassword && !message) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [password, message, confirmPassword]);

  const changePassword = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={changePassword}>
      <Form.Group className='mb-1'>
        <Form.Label>Enter new password:</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter Password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Confirm new password:</Form.Label>
        <Form.Control
          type='password'
          placeholder='Re-enter Password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {message && <h6 className='text-danger'>Passwords do not match</h6>}
      </Form.Group>
      <div className='d-grid gap-2'>
        <ButtonComponent
          variant={'dark'}
          name={'Sign Up'}
          disabled={buttonDisabled}
        />
      </div>
    </Form>
  );
};

export default ForgotPasswordComponent;
