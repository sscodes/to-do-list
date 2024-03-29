import { useEffect, useState } from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { themeActions } from '../actions/themeActions';
import image from '../assets/Logo.png';
import Profile from './Profile';
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
    console.log(theme);
    if (theme === 'LIGHT') dispatch(themeActions('DARK'));
    else dispatch(themeActions('LIGHT'));
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
              <img
                alt=''
                src={image}
                width='30'
                height='30'
                className='d-inline align-top'
              />{' '}
              <h4 className='d-inline'>TaskMate</h4>
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
