import { useEffect, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { themeActions } from '../actions/themeActions';
import image from '../assets/Logo.png';
import Profile from '../Components/Modals/Profile';
import { CgProfile } from 'react-icons/cg';

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

  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.theme);

  const changeTheme = () => {
    if (theme === 'LIGHT') dispatch(themeActions('DARK'));
    else dispatch(themeActions('LIGHT'));
  };

  return (
    <>
      <Profile show={modal} onHide={() => setModal(false)} />
      <Navbar
        className='bg-body-tertiary navbar header'
        bg='dark'
        data-bs-theme='dark'
        sticky='top'
      >
        <Container className='header-contents'>
          <Navbar.Brand>
            <Link
              to='/'
              style={{ textDecoration: 'none', color: 'whitesmoke' }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <img
                  alt=''
                  src={image}
                  width='35'
                  height='35'
                  className='d-inline align-top'
                />
                <h3 className='d-inline'>TaskMate</h3>
              </div>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          {name?.length && (
            <Navbar.Collapse className='justify-content-end'>
              <Navbar.Text className='ThemeIcon'>
                <CgProfile onClick={showProfile} />
              </Navbar.Text>
            </Navbar.Collapse>
          )}
          <div className='ThemeIcon'>
            {theme === 'DARK' ? (
              <MdLightMode onClick={changeTheme} />
            ) : (
              <MdDarkMode onClick={changeTheme} />
            )}
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
