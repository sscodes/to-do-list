import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../actions/authActions';

const Profile = (props) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    Object.getOwnPropertyNames(state?.user?.user).length === 0
      ? state?.auth?.user
      : state?.user?.user
  );
  useEffect(() => {
    setName(user.name);
  }, [user.name]);

  const logout = () => {
    dispatch(logoutUser());
  };

  const deleteUser = () => {};
  return (
    <Modal
      {...props}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={logout} variant='dark'>
          Logout
        </Button>
        <Button onClick={deleteUser} variant='danger'>
          Delete User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Profile;
