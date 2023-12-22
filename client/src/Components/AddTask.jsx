import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { createTask } from '../actions/taskActions';
import ButtonComponent from './ButtonComponent';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [deadline, setDeadline] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    Object.getOwnPropertyNames(state?.user?.user).length === 0
      ? state?.auth?.user
      : state?.user?.user
  );
  const token = useSelector((state) =>
    state.user.user.token ? state.user.user.token : state.auth.user.token
  );

  const submitTask = (e) => {
    e.preventDefault();
    const task = {
      user: user._id,
      taskName: title,
      taskDetail: details,
      deadline: deadline,
      done: false,
    };
    dispatch(createTask(task, token));
  };

  return (
    <div>
      <h4>Add a task:</h4>
      <Form onSubmit={submitTask}>
        <Form.Group className='mb-1'>
          <Form.Label>Task Title:</Form.Label>
          <Form.Control
            type='text'
            placeholder='Add Task'
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-1'>
          <Form.Label>Task Description (optional):</Form.Label>
          <Form.Control
            as='textarea'
            placeholder='Descrbe the task...'
            rows={3}
            onChange={(e) => setDetails(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Set deadline:</Form.Label>
          <Form.Control
            type='date'
            onChange={(e) => setDeadline(e.target.value)}
          />
        </Form.Group>
        <div className='d-grid gap-2'>
          <ButtonComponent
            type={'submit'}
            variant={'dark'}
            name={'Add Tasks'}
          />
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default AddTask;
