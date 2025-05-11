import { FormEvent, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { notificationProperties } from '@/utils/constants';
import ButtonComponent from '@/components/button/ButtonComponent';
import { useUpdateUserPassword } from '@/services/auth/auth.data';

interface ForgotPasswordComponentProps {
  email: string;
}

const ForgotPasswordComponent = ({ email }: ForgotPasswordComponentProps) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // const dispatch = useDispatch();

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
      password &&
      confirmPassword &&
      !confirmPasswordMessage &&
      !passwordMessage &&
      navigator.onLine
    )
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [password, confirmPasswordMessage, confirmPassword, passwordMessage]);

  const notifyError = (error: string) =>
    toast.error(error, notificationProperties);
  const notifySuccess = (msg: string) =>
    toast.success(msg, notificationProperties);
  const {
    mutateAsync: updatePassword,
    isSuccess,
    isError,
  } = useUpdateUserPassword();

  const changePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await updatePassword({ email, newPassword: password });

    if (isSuccess) {
      notifySuccess(res);
    }

    if (isError) {
      notifyError(res);
    }
  };

  // const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <Form onSubmit={changePassword}>
        <Form.Group className='mb-1'>
          <Form.Label className={'tm-font-secondary fw-medium'}>
            Enter new password:
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
            // className={`${theme === 'DARK' && 'form-control-dark'}`}
          />
          {passwordMessage && (
            <h6 className='text-danger'>{passwordMessage}</h6>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label className={'tm-font-secondary fw-medium'}>
            Confirm new password:
          </Form.Label>
          <Form.Control
            type='password'
            placeholder='Re-enter Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
            // className={`${theme === 'DARK' && 'form-control-dark'}`}
          />
          {confirmPasswordMessage && (
            <h6 className='text-danger'>Passwords do not match</h6>
          )}
        </Form.Group>
        <div className='d-grid gap-2'>
          <ButtonComponent
            variant={'dark'}
            name={'Update Password'}
            disabled={buttonDisabled}
          />
        </div>
      </Form>
      <ToastContainer />
    </>
  );
};

export default ForgotPasswordComponent;
