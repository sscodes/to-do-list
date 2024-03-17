import { Card, Col, Form, Row } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import '../Style/Checkbox.css';
import { changeTaskDoneStatus, deleteTaskAction } from '../actions/taskActions';

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

  const { theme } = useSelector((state) => state.theme);

  return (
    <Card style={{ width: '97%', height: '100%', border: '0.15rem solid black' }}>
      <Card.Header className={`${theme === 'DARK' && 'task-header-dark'}`}>
        <Row>
          <Col xs={10}>{props.title}</Col>
          <Col xs={2}>
            <MdDelete style={{ cursor: 'pointer' }} onClick={deleteTask} />
          </Col>
        </Row>
      </Card.Header>
      <Card.Body className={`${theme === 'DARK' && 'task-body-dark'}`}>
        <Card.Text>{props.details}</Card.Text>
        <b>Deadline:</b> {formatDate(props.deadline)}
        <Row>
          <Col className='text-center'>
            <Row className='d-block align-middle align-items-center mt-4 border py-1 border rounded border-dark text-dark'>
              <Form.Check
                type='checkbox'
                id='default-checkbox'
                defaultChecked={props.done}
                onChange={changeDoneStatus}
                className='d-inline'
              />
              <div className='d-inline mt-5 fs-6 fs-lg-5'>
                Mark as {props.done ? `pending` : `done`}
              </div>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Task;
