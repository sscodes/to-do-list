import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Signin from '../Components/Signin';
import Signup from '../Components/Signup';
import { googleOauth } from '../actions/authActions';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const user = {
      name: searchParams?.get('name'),
      token: searchParams?.get('token'),
    };
    if (searchParams?.get('name')) dispatch(googleOauth(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <Header />
      <Container>
        <Row className='pt-3 text-center'>
          <h1 className={`${theme === 'DARK' ? 'text-light' : 'text-dark'}`}>
            A no-nonsense to-do list app.
          </h1>
        </Row>
        <div className='pb-2 my-2 mt-lg-0 boxes'>
          <div className='p-2 border border-dark-subtle border-3 rounded'>
            <Signup />
          </div>
          <div className='mt-2 mb-5 mt-lg-0 mb-lg-0 p-2 border border-dark-subtle border-3 rounded'>
            <Signin />
            <a
              href='https://to-do-list-api-ddho.onrender.com/api/users/google'
              className='d-grid gap-2 mt-3 border border-primary rounded bg-primary py-1 border-3 text-white text-center'
              style={{ textDecoration: 'none', fontSize: '1.4rem' }}
            >
              Login with Google
            </a>
          </div>
        </div>
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Home;
