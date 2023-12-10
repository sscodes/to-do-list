import { Accordion, Col, Form, Row } from 'react-bootstrap';
import '../Style/Checkbox.css';
import ButtonComponent from './ButtonComponent';

const Task = (props) => {
  return (
    <Accordion className='py-2'>
      <Accordion.Item eventKey={props.id}>
        <Accordion.Header>
          <h4>{props.title}</h4>
        </Accordion.Header>
        <Accordion.Body>
          <p>{props.details}</p>
          <b>Deadline:</b>
          <h6>{props.deadline}</h6>
          <Row>
            <Col>
              <Row className='mt-4 border border-2 rounded border-dark-subtle bg-success text-white'>
                <Col xs={5} className='d-flex flex-row-reverse'>
                  <Form.Check
                    type='checkbox'
                    id='default-checkbox'
                    checked={props.done ? true : false}
                  />
                </Col>
                <Col xs={7} className='mt-2'>
                  <h4>Mark as {props.done ? `pending` : `done`}</h4>
                </Col>
              </Row>
            </Col>
            <Col>
              <div className='py-4 d-grid gap-2'>
                <ButtonComponent variant={'danger'} name={'Delete Task'} />
              </div>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Task;
