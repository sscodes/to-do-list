import React from 'react';
import { Form } from 'react-bootstrap';
import Calendar from 'react-calendar';
import { MdDateRange } from 'react-icons/md';
import { useSelector } from 'react-redux';
import ButtonComponent from './ButtonComponent';

const FormComponent = (props) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div>
      <Form onSubmit={props.submitTask}>
        <Form.Group className='mb-3'>
          <Form.Label
            className={`${theme === 'DARK' ? 'text-light' : 'text-dark'} h5`}
          >
            Task Title:
          </Form.Label>
          <Form.Control
            type='text'
            className={`${props.border ? 'border border-dark' : ''} ${
              theme === 'DARK' && 'form-control-dark'
            }`}
            style={{fontSize: '1.4rem'}}
            placeholder='Add Task'
            onChange={(e) => props.setTitle(e.target.value)}
            value={props.title && props.title}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label
            className={`${theme === 'DARK' ? 'text-light' : 'text-dark'} h5`}
          >
            Task Description (optional):
          </Form.Label>
          <Form.Control
            as='textarea'
            className={`${props.border ? 'border border-dark' : ''} ${
              theme === 'DARK' && 'form-control-dark'
            }`}
            style={{fontSize: '1.4rem'}}
            placeholder='Descrbe the task...'
            rows={4}
            onChange={(e) => props.setDetails(e.target.value)}
            value={props.details && props.details}
          />
        </Form.Group>
        <Form.Group className='mb-3' style={{ position: 'relative' }}>
          <Form.Label
            className={`${theme === 'DARK' ? 'text-light' : 'text-dark'} h5`}
          >
            Set deadline:
          </Form.Label>
          <div
            className={`${
              props.border ? 'border border-dark' : ''
            } date-field ${theme === 'DARK' && 'form-control-dark'}`}
            onClick={() => props.setShowCalender((e) => !e)}
            style={{fontSize: '1.4rem'}}
          >
            {`${props.dd}/${props.mm}/${props.yyyy}`} <MdDateRange />
          </div>
          <div className='calender'>
            {props.showCalender && (
              <Calendar onChange={props.setDate} value={new Date()} />
            )}
          </div>
        </Form.Group>
        <div className='d-grid gap-2'>
          <ButtonComponent
            type={'submit'}
            variant={'dark'}
            name={props.buttonTitle}
            disabled={props.disableBtn}
          />
        </div>
      </Form>
    </div>
  );
};

export default FormComponent;
