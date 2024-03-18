import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { loginUser } from '../actions/authActions';
import ButtonComponent from './ButtonComponent';
import { ToastContainer } from 'react-toastify';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const authenticated = useSelector((state) =>
    state.user.authenticated
      ? state.user.authenticated
      : state.auth.authenticated
  );

  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    if (email && password && navigator.onLine) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [email, password]);

  const signin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(loginUser(user));
  };

  if (authenticated) {
    return <Navigate to={`/home`} />;
  }

  return (
    <div>
      <div className='text-center'>
        <h4 className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}>
          Already have an account?
        </h4>
        <h4 className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}>
          {' '}
          Sign In!
        </h4>
      </div>
      <Form onSubmit={signin}>
        <Form.Group className='mb-1'>
          <Form.Label
            className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}
          >
            Email address:
          </Form.Label>
          <Form.Control
            type='email'
            placeholder='name@example.com'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label
            className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}
          >
            Password:
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='pt-1'>
            <Link
              to='/forgotpassword'
              style={{ textDecoration: 'none', color: 'black' }}
              className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}
            >
              (Forgot Password?)
            </Link>
          </div>
        </Form.Group>
        <div className='d-grid gap-2'>
          <ButtonComponent
            variant={'dark'}
            name={'Sign In'}
            disabled={buttonDisabled}
          />
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default Signin;
