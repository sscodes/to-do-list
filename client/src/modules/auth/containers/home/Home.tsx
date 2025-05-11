import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AUTH_FORMAT } from '../../../../helpers/types';
import AuthCarousel from '../../components/auth-carousel/AuthCarousel';
import Signin from '../../components/signin/Signin';
import Signup from '../../components/signup/Signup';

const Home = () => {
  const [authFormat, setAuthFormat] = useState(AUTH_FORMAT.SIGN_UP);
  // const dispatch = useDispatch();
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const user = {
      name: searchParams?.get('name'),
      token: searchParams?.get('token'),
    };
    if (searchParams?.get('name'))
      localStorage.setItem('auth', JSON.stringify(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const { theme } = useSelector((state) => state.theme);

  const token = JSON.parse(localStorage.getItem('auth') as string)?.token;

  if (token) {
    return <Navigate to={`/home`} />;
  }

  return (
    <>
      <Container fluid className='mb-5'>
        <Row className='boxes'>
          <Col xs={12} md={6} className='d-flex justify-content-center'>
            {authFormat === 'up' ? (
              <Signup setAuthFormat={setAuthFormat} />
            ) : (
              <Signin setAuthFormat={setAuthFormat} />
            )}
          </Col>
          <Col md={6} className='d-flex justify-content-center'>
            <AuthCarousel />
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Home;
