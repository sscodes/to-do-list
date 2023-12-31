import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
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

  return (
    <>
      <Header />
      <Container>
        <Row className='pt-3 text-center'>
          <h4>A no-nonsense to-do list app.</h4>
        </Row>
        <Row className='pb-2'>
          <Col className='mx-1 p-2 border border-dark-subtle border-3 rounded'>
            <Signup />
          </Col>
          <Col className='mx-1 p-2 border border-dark-subtle border-3 rounded'>
            <Signin />
            <a
              href='http://localhost:7000/api/users/google'
              className='d-grid gap-2 mt-3 border border-primary rounded bg-primary py-1 border-3 text-white text-center'
              style={{ textDecoration: 'none' }}
            >
              Login with Google
            </a>
          </Col>
        </Row>
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Home;
