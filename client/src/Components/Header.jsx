import { useEffect, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Profile from './Profile';

const Header = () => {
  const [name, setName] = useState('');
  const [modal, setModal] = useState('');
  useEffect(() => {
    setName(localStorage.getItem('name'));
  }, []);

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
              <h1>To-Do-List</h1>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          {name?.length && (
            <Navbar.Collapse className='justify-content-end'>
              <Navbar.Text>
                <h5>
                  Signed in as:{' '}
                  <u onClick={showProfile} style={{ cursor: 'pointer' }}>
                    {name}
                  </u>
                </h5>
              </Navbar.Text>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
