import { Form } from 'react-bootstrap';
import ButtonComponent from './ButtonComponent';

const Signin = () => {
  return (
    <div>
      <div className='text-center'>
        <h2>Already have an account?</h2>
        <h2> Sign In!</h2>
      </div>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Email address:</Form.Label>
          <Form.Control type='email' placeholder='name@example.com' />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Password:</Form.Label>
          <Form.Control type='password' placeholder='name@example.com' />
        </Form.Group>
        <div className='d-grid gap-2'>
          <ButtonComponent variant={'dark'} name={'Sign In'} />
        </div>
      </Form>
    </div>
  );
};

export default Signin;
