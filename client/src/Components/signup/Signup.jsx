import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import ButtonComponent from '../ButtonComponent';
import OTPComponent from '../OTPComponent';
import { useSelector } from 'react-redux';
import google from '../../assets/logo/google.png';
import './Signup.css';
import { Link } from 'react-router-dom';
import { AUTH_FORMAT } from '../../helpers/constants';

const Signup = ({ setAuthFormat }) => {
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

  const { theme } = useSelector((state) => state.theme);

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
    <div className='signUp d-flex flex-column row-gap-3 justify-content-center border border-1 rounded rounded-4 p-5 bg-white shadow'>
      <div className='text-center tm-font-primary'>
        <h4
          className={`${theme === 'DARK' ? 'text-light' : 'text-dark'} fw-bold`}
        >
          New here? <span className='tm-text-primary'>Sign Up!</span>
        </h4>
      </div>
      <Form onSubmit={signup}>
        <Form.Group className='mb-2'>
          <Form.Label
            className={`${
              theme === 'DARK' ? 'text-light' : 'text-dark'
            } tm-font-secondary fw-medium`}
            style={{ fontSize: '1rem' }}
          >
            Name:
          </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            className={`${
              theme === 'DARK' && 'form-control-dark'
            } tm-font-secondary`}
            onChange={(e) => setName(e.target.value)}
            style={{ fontSize: '1rem' }}
          />
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label
            className={`${
              theme === 'DARK' ? 'text-light' : 'text-dark'
            } tm-font-secondary fw-medium`}
            style={{ fontSize: '1rem' }}
          >
            Email address:
          </Form.Label>
          <Form.Control
            type='email'
            placeholder='name@example.com'
            className={`${
              theme === 'DARK' && 'form-control-dark'
            } tm-font-secondary`}
            onChange={(e) => setEmail(e.target.value)}
            style={{ fontSize: '1rem' }}
          />
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label
            className={`${
              theme === 'DARK' ? 'text-light' : 'text-dark'
            } tm-font-secondary fw-medium`}
            style={{ fontSize: '1rem' }}
          >
            Password:
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            className={`${
              theme === 'DARK' && 'form-control-dark'
            } tm-font-secondary`}
            onChange={(e) => setPassword(e.target.value)}
            style={{ fontSize: '1rem' }}
          />
          {passwordMessage && (
            <div className='text-danger' style={{ fontSize: '10px' }}>
              {passwordMessage}
            </div>
          )}
        </Form.Group>
        <Form.Group className='mb-2'>
          <Form.Label
            className={`${
              theme === 'DARK' ? 'text-light' : 'text-dark'
            } tm-font-secondary fw-medium`}
            style={{ fontSize: '1rem' }}
          >
            Confirm Password:
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Re-enter Password'
            className={`${theme === 'DARK' && 'form-control-dark'}`}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ fontSize: '1rem' }}
          />
          {confirmPasswordMessage && (
            <div
              className='text-danger tm-font-secondary'
              style={{ fontSize: '10px' }}
            >
              Passwords do not match
            </div>
          )}
        </Form.Group>
        <div className='d-grid pt-2'>
          <ButtonComponent
            variant={'primary'}
            name={'Sign Up'}
            disabled={buttonDisabled}
            type={'submit'}
          />
        </div>
      </Form>
      <div className='d-flex align-items-center gap-2'>
        <div className='d-inline-block w-100 divider bg-secondary'></div>
        <div className='text-secondary tm-font-secondary'>or</div>
        <div className='d-inline-block w-100 divider bg-secondary'></div>
      </div>
      <a
        href='https://to-do-list-api-ddho.onrender.com/api/users/google'
        className='d-flex justify-content-center align-items-center gap-2 border border-primary rounded bg-white border-1 py-2'
        style={{ textDecoration: 'none', fontSize: '1rem' }}
      >
        <div>
          <img src={google} alt='' width={20} />
        </div>
        <div className='tm-font-secondary'>Sign up with Google</div>
      </a>
      <div className='text-center tm-font-secondary'>
        Already, have an account?{' '}
        <Link onClick={() => setAuthFormat(AUTH_FORMAT.SIGN_IN)}>Sign In!</Link>
      </div>
    </div>
  );
};

export default Signup;
