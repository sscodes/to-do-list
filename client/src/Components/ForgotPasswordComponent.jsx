import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import ButtonComponent from './ButtonComponent';
import { Navigate } from 'react-router-dom';

const ForgotPasswordComponent = ({ email }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (password === '' || confirmPassword === '') setMessage(false);
    else if (password !== confirmPassword) setMessage(true);
    else setMessage(false);
  }, [password, confirmPassword]);

  useEffect(() => {
    if (password && confirmPassword && !message) setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [password, message, confirmPassword]);

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
      body: JSON.stringify(newpassword),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message);
          });
        }
      })
      .then((msg) => {
        notifySuccess(msg);
        return <Navigate to='/' />;
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
      <ToastContainer />
    </>
  );
};

export default ForgotPasswordComponent;
