import { Button, Modal } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import ModalComponent from '../../HOC/ModalComponent';
import { formatDate } from '../../utils/formDate';
import { Value as DateValue } from 'node_modules/react-calendar/dist/esm/shared/types';

interface TaskDetailsProps {
  show: boolean;
  onHide: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  details: string;
  deadline: DateValue;
}

const TaskDetails = ({
  show,
  onHide,
  title,
  details,
  deadline,
}: TaskDetailsProps) => {
  // const { theme } = useSelector((state) => state.theme);
  const handleHide = () => {
    onHide(false);
  };
  return (
    <ModalComponent show={show} onHide={handleHide} fullscreen={true}>
      <Modal.Header
      // className={`${theme === 'DARK' && 'task-header-dark'}`}
      >
        <Modal.Title style={{ fontSize: '2rem' }}>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body
      // className={`${theme === 'DARK' && 'task-body-dark'}`}
      >
        <p style={{ fontSize: '1.7rem' }}>{details}</p>
        <b style={{ fontSize: '1.2rem', textDecoration: 'underline' }}>
          This task needs to be completed by {formatDate(deadline)}
        </b>
      </Modal.Body>

      <Modal.Footer
      // className={`${theme === 'DARK' && 'task-header-dark '}`}
      >
        <Button variant='secondary' onClick={() => onHide((e) => !e)}>
          Close
        </Button>
      </Modal.Footer>
    </ModalComponent>
  );
};

export default TaskDetails;
