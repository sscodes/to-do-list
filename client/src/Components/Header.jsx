import { useEffect, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Profile from './Profile';
import { useSelector } from 'react-redux';

const Header = () => {
  const [name, setName] = useState('');
  const [modal, setModal] = useState('');
  const user = useSelector((state) =>
    Object.getOwnPropertyNames(state?.user?.user).length === 0
      ? state?.auth?.user
      : state?.user?.user
  );
  useEffect(() => {
    setName(user.name);
  }, [user.name]);

  const showProfile = () => {
    setModal(true);
  };

  return (
    <>
      <Profile show={modal} onHide={() => setModal(false)} />
      <Navbar
        className='bg-body-tertiary'
        bg='dark'
        data-bs-theme='dark'
        sticky='top'
      >
        <Container>
          <Navbar.Brand>
            <Link
              to='/'
              style={{ textDecoration: 'none', color: 'whitesmoke' }}
            >
              <h4>To-Do-List</h4>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          {name?.length && (
            <Navbar.Collapse className='justify-content-end'>
              <Navbar.Text>
                <h6 className='pt-1'>
                  Signed in as:{' '}
                  <u onClick={showProfile} style={{ cursor: 'pointer' }}>
                    {name}
                  </u>
                </h6>
              </Navbar.Text>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
