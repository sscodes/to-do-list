import { Form } from 'react-bootstrap';
import ButtonComponent from './ButtonComponent';

const AddTask = () => {
  return (
    <div className='py-2'>
      <h2>Add a task:</h2>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Task Title:</Form.Label>
          <Form.Control size='lg' type='text' placeholder='Add Task' />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Task Description (optional):</Form.Label>
          <Form.Control
            as='textarea'
            placeholder='Descrbe the task...'
            rows={3}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Set deadline:</Form.Label>
          <Form.Control type='date' />
        </Form.Group>
        <div className='d-grid gap-2'>
          <ButtonComponent variant={'dark'} name={'Add Tasks'} />
        </div>
      </Form>
    </div>
  );
};

export default AddTask;
