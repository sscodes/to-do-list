import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const UpcomingDeadlines = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const alertTasks = tasks.filter((task) => {
    const diffTime = Math.abs(new Date(task.deadline) - new Date());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) < 7;
  });

  const sortedAlertTasks = alertTasks.sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  return (
    <>
      <h2 className='pb-2'>Upcoming Deadlines:</h2>
      {sortedAlertTasks.map((task) => (
        <Alert key={task._id} variant='danger'>
          {task.taskName}
        </Alert>
      ))}
    </>
  );
};

export default UpcomingDeadlines;
