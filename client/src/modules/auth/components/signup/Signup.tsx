import { ASSETS } from '@/helpers/assets';
import clsx from 'clsx';
import { FormEvent, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import { API_END_POINT } from '@/helpers/config';
import 'react-toastify/dist/ReactToastify.css';
import { AUTH_FORMAT, OTP_SRC } from '../../../../helpers/types';
import ButtonComponent from '../../../../components/button/ButtonComponent';
import OTPComponent from '../otp/OTPComponent';
import classes from './Signup.module.css';

interface SignupProps {
  setAuthFormat: React.Dispatch<React.SetStateAction<AUTH_FORMAT>>;
}

const Signup = ({ setAuthFormat }: SignupProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showOTPComponent, setShowOTPComponent] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
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

  const signup = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowOTPComponent(true);
  };

  // const { theme } = useSelector((state) => state.theme);

  return (
    <div
      className={clsx(
        classes.signUp,
        'd-flex flex-column row-gap-3 justify-content-center border border-1 rounded rounded-4 p-5 bg-white shadow'
      )}
    >
      {showOTPComponent ? (
        <div className='d-flex align-items-center'>
          <div className='w-100'>
            <div className='tm-font-primary'>
              <h4 className={'fw-bold'}>Enter OTP</h4>
              <h6 className={'tm-text-primary'}>
                Check for a 6-digit OTP on your mail.
              </h6>
            </div>
            <div className='mt-4'>
              <OTPComponent
                user={{
                  name,
                  email,
                  password,
                }}
                type={OTP_SRC.SIGN_UP}
                emailProp={email}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className='text-center tm-font-primary'>
            <h4 className={'fw-bold'}>
              New here? <span className='tm-text-primary'>Sign Up!</span>
            </h4>
          </div>
          <Form onSubmit={signup}>
            <Form.Group className='mb-2'>
              <Form.Label
                className={'tm-font-secondary fw-medium'}
                style={{ fontSize: '1rem' }}
              >
                Name:
              </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter name'
                className={'tm-font-secondary'}
                onChange={(e) => setName(e.target.value)}
                style={{ fontSize: '1rem' }}
              />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label
                className={'tm-font-secondary fw-medium'}
                style={{ fontSize: '1rem' }}
              >
                Email address:
              </Form.Label>
              <Form.Control
                type='email'
                placeholder='name@example.com'
                className={'tm-font-secondary'}
                onChange={(e) => setEmail(e.target.value)}
                style={{ fontSize: '1rem' }}
              />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label
                className={'tm-font-secondary fw-medium'}
                style={{ fontSize: '1rem' }}
              >
                Password:
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter Password'
                className={'tm-font-secondary'}
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
                className={'tm-font-secondary fw-medium'}
                style={{ fontSize: '1rem' }}
              >
                Confirm Password:
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Re-enter Password'
                // className={`${theme === 'DARK' && 'form-control-dark'}`}
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
            href={`${API_END_POINT}api/users/google`}
            className='d-flex justify-content-center align-items-center gap-2 border border-primary rounded bg-white border-1 py-2'
            style={{ textDecoration: 'none', fontSize: '1rem' }}
          >
            <div>
              <img src={ASSETS.logo.googleLogo} alt='' width={20} />
            </div>
            <div className='tm-font-secondary'>Sign up with Google</div>
          </a>
          <div className='text-center tm-font-secondary'>
            Already, have an account?{' '}
            <u
              className={clsx(classes.signin, 'text-primary')}
              onClick={() => setAuthFormat(AUTH_FORMAT.SIGN_IN)}
            >
              Sign In!
            </u>
          </div>
        </>
      )}
    </div>
  );
};

export default Signup;
