import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import ButtonComponent from './ButtonComponent';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordComponent = ({ email }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState(null);
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      !passwordMessage
    )
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [password, confirmPasswordMessage, confirmPassword, passwordMessage]);

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

  const updateUser = (email, newpassword) => () => {
    fetch(`http://localhost:7000/api/users/updatepassword/${email}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(newpassword),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.confirmPasswordMessage);
          });
        } else return res.json();
      })
      .then(({ msg }) => {
        notifySuccess(msg);
        navigate('/');
      })
      .catch((error) => notifyError(error));
  };

  const changePassword = (e) => {
    e.preventDefault();
    dispatch(
      updateUser(email, {
        password,
      })
    );
  };

  return (
    <>
      <Form onSubmit={changePassword}>
        <Form.Group className='mb-1'>
          <Form.Label>Enter new password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordMessage && (
            <h6 className='text-danger'>{passwordMessage}</h6>
          )}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Confirm new password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Re-enter Password'
            onChange={(e) => setConfirmPassword(e.target.value)}
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
