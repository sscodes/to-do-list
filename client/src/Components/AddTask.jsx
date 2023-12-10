import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createTask } from '../actions/taskActions';
import ButtonComponent from './ButtonComponent';

const AddTask = () => {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [deadline, setDeadline] = useState('');
  const dispatch = useDispatch();

  const submitTask = (e) => {
    e.preventDefault();
    const task = {
      title,
      details,
      deadline,
      done: false,
    };
    console.log(task);
    dispatch(createTask(task));
  };

  return (
    <div className='py-2'>
      <h2>Add a task:</h2>
      <Form onSubmit={submitTask}>
        <Form.Group className='mb-3'>
          <Form.Label>Task Title:</Form.Label>
          <Form.Control
            size='lg'
            type='text'
            placeholder='Add Task'
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
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
    </div>
  );
};

export default AddTask;
