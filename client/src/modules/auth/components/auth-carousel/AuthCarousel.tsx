import { ASSETS } from '@/helpers/assets';
import clsx from 'clsx';
import { Carousel } from 'react-bootstrap';
import SVG from 'react-inlinesvg';
import classes from './AuthCarousel.module.css';

const AuthCarousel = () => {
  return (
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
            Keep only what matters—TaskMate helps you streamline your tasks and
            stay productive.
          </p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <SVG src={ASSETS.illustrations.indoorBike} height={470} title='React' />
        <div className='text-black mt-5 text-center'>
          <h3 className='tm-font-tertiary tm-text-primary fw-bold tm-italics'>
            Because Every Step Counts!
          </h3>
          <p className='tm-font-tertiary fw-medium'>
            From workouts to work projects, track progress and stay accountable
            with TaskMate.
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
  );
};

export default AuthCarousel;
