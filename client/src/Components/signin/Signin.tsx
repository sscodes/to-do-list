import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ButtonComponent from '../ButtonComponent';
import google from '../../../public/assets/logo/google.png';
import { useLoginUser } from '../../services/auth/auth.data';
import { AUTH_FORMAT } from '../../helpers/types';
import classes from './Signin.module.css';
import clsx from 'clsx';
import { API_END_POINT } from '@/helpers/config';
import { ToastContainer, toast } from 'react-toastify';

const Signin = ({ setAuthFormat }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  const { mutateAsync: loginUser, isSuccess: isAuthenticated } = useLoginUser();

  useEffect(() => {
    if (email && password && navigator.onLine) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [email, password]);

  const notificationProperties = {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  };

  const notifyError = (error: string) =>
    toast.error(error, notificationProperties);

  const signin = async (e: MouseEvent) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    try {
      await loginUser({ user });
      navigate('/home');
    } catch (error: any) {
      notifyError(error.message);
    }
  };

  return (
    <>
      <div
        className={clsx(
          'd-flex flex-column row-gap-3 justify-content-center border border-1 rounded rounded-4 p-5 bg-white shadow',
          classes.signIn
        )}
      >
        <div className='text-center tm-font-primary'>
          <h4
            className={`${
              theme === 'DARK' ? 'text-light' : 'text-dark'
            } fw-bold`}
          >
            Already have an account?{' '}
            <span className='tm-text-primary'>Sign In!</span>
          </h4>
        </div>
        <Form onSubmit={signin}>
          <Form.Group className='mb-1'>
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
              onChange={(e) => setEmail(e.target.value)}
              className={`${
                theme === 'DARK' && 'form-control-dark'
              } tm-font-secondary`}
              style={{ fontSize: '1rem' }}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
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
              onChange={(e) => setPassword(e.target.value)}
              className={`${
                theme === 'DARK' && 'form-control-dark'
              } tm-font-secondary`}
              style={{ fontSize: '1rem' }}
            />
            <div className='pt-1'>
              <Link
                to='/forgotpassword'
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  fontSize: '1rem',
                }}
                className={`${
                  theme === 'DARK' ? 'text-light' : 'text-dark'
                } tm-font-secondary`}
              >
                (Forgot Password?)
              </Link>
            </div>
          </Form.Group>
          <div className='d-grid gap-2'>
            <ButtonComponent
              type={'submit'}
              name={'Sign In'}
              disabled={buttonDisabled}
            />
          </div>
        </Form>
        <div className='d-flex align-items-center gap-2'>
          <div
            className={clsx(
              classes.divider,
              'd-inline-block w-100 bg-secondary'
            )}
          ></div>
          <div className='text-secondary tm-font-secondary'>or</div>
          <div
            className={clsx(
              classes.divider,
              'd-inline-block w-100 bg-secondary'
            )}
          ></div>
        </div>
        <a
          href={`${API_END_POINT}/api/users/google`}
          className='d-flex justify-content-center align-items-center gap-2 border border-primary rounded bg-white border-1 py-2'
          style={{ textDecoration: 'none', fontSize: '1rem' }}
        >
          <div>
            <img src={google} alt='' width={20} />
          </div>
          <div className='tm-font-secondary'>Sign in with Google</div>
        </a>
        <div className='text-center tm-font-secondary'>
          New Here?{' '}
          <Link onClick={() => setAuthFormat(AUTH_FORMAT.SIGN_UP)}>
            Sign Up!
          </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signin;
