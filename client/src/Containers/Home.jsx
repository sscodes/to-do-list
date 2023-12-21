import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ButtonComponent from '../Components/ButtonComponent';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Signin from '../Components/Signin';
import Signup from '../Components/Signup';
import { googleOauth } from '../actions/authActions';

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
      <Container className='pt-2'>
        <Row className='pt-3 text-center'>
          <h1>A no-nonsense to-do list app.</h1>
        </Row>
        <Row className='py-2'>
          <Col className='mx-2 p-4 border border-dark-subtle border-3 rounded'>
            <Signup />
          </Col>
          <Col className='mx-2 p-4 border border-dark-subtle border-3 rounded'>
            <Signin />
          </Col>
        </Row>
        <Row className='pt-3 text-center'>
          <Col className='mx-2 p-4 border border-dark-subtle border-3 rounded'>
            <a href='http://localhost:7000/api/users/google'>
              <ButtonComponent name={'Login with Google'} />
            </a>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;
