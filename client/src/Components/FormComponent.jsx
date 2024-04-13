import React from 'react';
import Calendar from 'react-calendar';
import { MdDateRange } from 'react-icons/md';
import ButtonComponent from './ButtonComponent';
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const FormComponent = ({
  title,
  details,
  submitTask,
  setTitle,
  setDetails,
  setDate,
  showCalender,
  setShowCalender,
  dd,
  mm,
  yyyy,
  buttonTitle,
  border = false,
}) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div>
      <Form onSubmit={submitTask}>
        <Form.Group className='mb-1'>
          <Form.Label
            className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}
          >
            Task Title:
          </Form.Label>
          <Form.Control
            type='text'
            className={`${border ? 'border border-dark' : ''} ${theme === 'DARK' && 'form-control-dark'}`}
            placeholder='Add Task'
            onChange={(e) => setTitle(e.target.value)}
            value={title && title}
          />
        </Form.Group>
        <Form.Group className='mb-1'>
          <Form.Label
            className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}
          >
            Task Description (optional):
          </Form.Label>
          <Form.Control
            as='textarea'
            className={`${border ? 'border border-dark' : ''} ${theme === 'DARK' && 'form-control-dark'}`}
            placeholder='Descrbe the task...'
            rows={3}
            onChange={(e) => setDetails(e.target.value)}
            value={details && details}
          />
        </Form.Group>
        <Form.Group className='mb-3' style={{ position: 'relative' }}>
          <Form.Label
            className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}
          >
            Set deadline:
          </Form.Label>
          <div
            className={`${border ? 'border border-dark' : ''} date-field ${theme === 'DARK' && 'form-control-dark'}`}
            onClick={() => setShowCalender((e) => !e)}
          >
            {`${dd}/${mm}/${yyyy}`} <MdDateRange />
          </div>
          <div className='calender'>
            {showCalender && <Calendar onChange={setDate} value={new Date()} />}
          </div>
        </Form.Group>
        <div className='d-grid gap-2'>
          <ButtonComponent
            type={'submit'}
            variant={'dark'}
            name={buttonTitle}
          />
        </div>
      </Form>
    </div>
  );
};

export default FormComponent;
