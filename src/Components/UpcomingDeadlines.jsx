import { Alert } from 'react-bootstrap';

const UpcomingDeadlines = () => {
  return (
    <>
      <h2 className='pb-2'>Upcoming Deadlines:</h2>
      {[1, 2, 3].map((i) => (
        <Alert key={i} variant='danger'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          debitis?
        </Alert>
      ))}
    </>
  );
};

export default UpcomingDeadlines;
