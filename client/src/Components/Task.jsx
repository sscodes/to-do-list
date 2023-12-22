import { Accordion, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../Style/Checkbox.css';
import { changeTaskDoneStatus, deleteTaskAction } from '../actions/taskActions';
import ButtonComponent from './ButtonComponent';

const Task = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) =>
    state.user.user.token ? state.user.user.token : state.auth.user.token
  );

  function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    return formattedDate;
  }

  const changeDoneStatus = () => {
    const change = {
      done: !props.done,
    };
    dispatch(changeTaskDoneStatus(change, token, props.id));
  };

  const deleteTask = () => {
    dispatch(deleteTaskAction(token, props.id));
  };

  return (
    <Accordion className='py-2'>
      <Accordion.Item eventKey={props.id}>
        <Accordion.Header>
          <h5>{props.title}</h5>
        </Accordion.Header>
        <Accordion.Body>
          <p>{props.details}</p>
          <b>Deadline:</b>
          <h6>{formatDate(props.deadline)}</h6>
          <Row>
            <Col>
              <Row className='mt-4 border py-1 border-2 rounded border-success bg-success text-white'>
                <Col xs={5} className='mx-auto'>
                  <Form.Check
                    type='checkbox'
                    id='default-checkbox'
                    defaultChecked={props.done}
                    onChange={changeDoneStatus}
                    className='d-inline'
                  />
                  <h5 className='d-inline'>{`     `}Mark as {props.done ? `pending` : `done`}</h5>
                </Col>
              </Row>
            </Col>
            <Col>
              <div className='py-4 d-grid gap-2'>
                <ButtonComponent
                  variant={'danger'}
                  name={'Delete Task'}
                  onClick={deleteTask}
                />
              </div>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default Task;
