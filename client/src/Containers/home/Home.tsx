import { useEffect, useState } from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Signin from '../../Components/signin/Signin';
import Signup from '../../Components/signup/Signup';
import SVG from 'react-inlinesvg';
import { AUTH_FORMAT } from '../../helpers/types';
import { ASSETS } from '@/helpers/assets';
import classes from "./home.module.css";
import clsx from 'clsx';

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
            <Carousel
              className={clsx('h-100 d-flex align-items-center', classes.carousel)}
              slide={false}
              controls={false}
              indicators={false}
              keyboard={false}
            >
              <Carousel.Item>
                <SVG
                  src={ASSETS.illustrations.onlineOrganizer}
                  height={470}
                  title='React'
                />
                <div className='text-black mt-5 text-center'>
                  <h3 className='tm-font-tertiary tm-text-primary fw-bold tm-italics'>
                    Sort, Filter & Focus!
                  </h3>
                  <p className='tm-font-secondary fw-medium'>
                    Keep only what matters—TaskMate helps you streamline your
                    tasks and stay productive.
                  </p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <SVG
                  src={ASSETS.illustrations.indoorBike}
                  height={470}
                  title='React'
                />
                <div className='text-black mt-5 text-center'>
                  <h3 className='tm-font-tertiary tm-text-primary fw-bold tm-italics'>
                    Because Every Step Counts!
                  </h3>
                  <p className='tm-font-tertiary fw-medium'>
                    From workouts to work projects, track progress and stay
                    accountable with TaskMate.
                  </p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <SVG
                  src={ASSETS.illustrations.workingLate}
                  height={470}
                  title='React'
                />
                <div className='text-black mt-5 text-center'>
                  <h3 className='tm-font-primary tm-text-primary fw-bold tm-italics'>
                    Burning the midnight oil? Make it count!
                  </h3>
                  <p className='tm-font-secondary fw-medium'>
                    Your side hustle deserves your passion. Track progress, stay
                    productive, and make it happen with TaskMate.
                  </p>
                </div>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default Home;
