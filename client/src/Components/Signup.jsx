import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import ButtonComponent from './ButtonComponent';
import OTPComponent from './OTPComponent';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOTPComponent, setShowOTPComponent] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (password.length > 0 && password.length < 7)
      setPasswordMessage('Length of password should be at least 7 characters');
    else if (password.length > 0 && !/\d/.test(password))
      setPasswordMessage('Password should have at least one numeric character');
    else if (
      password.length > 0 &&
      // eslint-disable-next-line no-useless-escape
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
    )
      setPasswordMessage('Password should have at least one special character');
    else setPasswordMessage(null);
  }, [password]);

  useEffect(() => {
    if (password === '' || confirmPassword === '')
      setConfirmPasswordMessage(false);
    else if (password !== confirmPassword) setConfirmPasswordMessage(true);
    else setConfirmPasswordMessage(false);
  }, [password, confirmPassword]);

  useEffect(() => {
    if (
      name &&
      email &&
      password &&
      confirmPassword &&
      !confirmPasswordMessage &&
      !passwordMessage &&
      navigator.onLine
    )
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [
    name,
    email,
    password,
    confirmPasswordMessage,
    confirmPassword,
    passwordMessage,
  ]);

  const signup = (e) => {
    e.preventDefault();
    setShowOTPComponent(true);
  };

  return showOTPComponent ? (
    <OTPComponent
      user={{
        name,
        email,
        password,
      }}
      type={'signup'}
      emailProp={email}
    />
  ) : (
    <>
      <div className='text-center'>
        <h4>New here? Sign Up!</h4>
      </div>
      <Form onSubmit={signup}>
        <Form.Group className='mb-1'>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-1'>
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type='email'
            placeholder='name@example.com'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-1'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordMessage && (
            <div className='text-danger' style={{ fontSize: '10px' }}>
              {passwordMessage}
            </div>
          )}
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Re-enter Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPasswordMessage && (
            <div className='text-danger' style={{ fontSize: '10px' }}>
              Passwords do not match
            </div>
          )}
        </Form.Group>
        <div className='d-grid gap-2'>
          <ButtonComponent
            variant={'dark'}
            name={'Sign Up'}
            disabled={buttonDisabled}
          />
        </div>
      </Form>
    </>
  );
};

export default Signup;
