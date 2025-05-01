import * as React from 'react';
import { Form } from 'react-bootstrap';
import Calendar from 'react-calendar';
import { MdDateRange } from 'react-icons/md';
// import { useSelector } from 'react-redux';
import ButtonComponent from './ButtonComponent';
import { Value as DateValue } from 'node_modules/react-calendar/dist/esm/shared/types';

interface FormComponentProps {
  submitTask: (e: React.FormEvent<HTMLFormElement>) => void;
  border?: boolean;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  title?: string;
  setDetails: React.Dispatch<React.SetStateAction<string>>;
  setShowCalender: React.Dispatch<React.SetStateAction<boolean>>;
  details?: string;
  dd: string;
  mm: string;
  yyyy: string;
  showCalender?: boolean;
  setDate: (e: DateValue) => void;
  buttonTitle: string;
  disableBtn?: boolean;
}

const FormComponent = ({
  submitTask,
  border = false,
  setTitle,
  title = '',
  setDetails,
  details = '',
  setShowCalender,
  dd,
  mm,
  yyyy,
  showCalender = false,
  setDate,
  buttonTitle,
  disableBtn = false,
}: FormComponentProps) => {
  // const { theme } = useSelector((state) => state.theme);

  return (
    <div>
      <Form onSubmit={submitTask}>
        <Form.Group className='mb-3'>
          <Form.Label
            className={`${
              'h6' // && theme === 'DARK' ? 'text-light' : 'text-dark'
            }`}
          >
            Task Title:
          </Form.Label>
          <Form.Control
            type='text'
            // className={`${border ? 'border border-dark' : ''} ${
            //   theme === 'DARK' && 'form-control-dark'
            // }`}
            className={`${border ? 'border border-dark' : ''}`}
            style={{ fontSize: '1rem' }}
            placeholder='Add Task'
            onChange={(e) => setTitle(e.target.value)}
            value={title && title}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label
            className={`${
              'h6' // && theme === 'DARK' ? 'text-light' : 'text-dark'
            }`}
          >
            Task Description (optional):
          </Form.Label>
          <Form.Control
            as='textarea'
            // className={`${border ? 'border border-dark' : ''} ${
            //   theme === 'DARK' && 'form-control-dark'
            // }`}
            className={`${border ? 'border border-dark' : ''}`}
            style={{ fontSize: '1rem' }}
            placeholder='Describe the task...'
            rows={4}
            onChange={(e) => setDetails(e.target.value)}
            value={details && details}
          />
        </Form.Group>
        <Form.Group className='mb-3' style={{ position: 'relative' }}>
          <Form.Label
            className={`${
              'h6' // && theme === 'DARK' ? 'text-light' : 'text-dark'
            }`}
          >
            Set deadline:
          </Form.Label>
          <div
            // className={`${
            //   border ? 'border border-dark' : ''
            // } date-field ${theme === 'DARK' && 'form-control-dark'}`}
            className={`${border ? 'border border-dark' : ''} date-field`}
            onClick={() => setShowCalender((e) => !e)}
            style={{ fontSize: '1rem' }}
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
            disabled={disableBtn}
          />
        </div>
      </Form>
    </div>
  );
};

export default FormComponent;
