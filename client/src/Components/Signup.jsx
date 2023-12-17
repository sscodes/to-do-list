import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUser } from '../actions/userActions';
import ButtonComponent from './ButtonComponent';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const dispatch = useDispatch();
  const error = useSelector((state) => state?.user?.error?.message);
  
  const notify = (error) =>
    toast.error(error, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  useEffect(() => {
    if (password === '' || confirmPassword === '') setMessage(false);
    else if (password !== confirmPassword) setMessage(true);
    else setMessage(false);
  }, [password, confirmPassword]);

  useEffect(() => {
    if (name && email && password && confirmPassword && !message)
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [name, email, password, message, confirmPassword]);

  const signup = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
    };
    dispatch(createUser(user));
    if (error) {
      notify(error);
      console.log(error);
    }
  };

  if (
    localStorage.getItem('token') &&
    localStorage.getItem('token').length > 0
  ) {
    return <Navigate to={`/home`} />;
  }

  return (
    <div>
      <div className='text-center'>
        <h2>New here? Sign Up!</h2>
      </div>
      <Form onSubmit={signup}>
        <Form.Group className='mb-3'>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type='email'
            placeholder='name@example.com'
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Confirm Password:</Form.Label>
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
    </div>
  );
};

export default Signup;
