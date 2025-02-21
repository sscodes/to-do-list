import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const UpcomingDeadlines = () => {
  const tasks = useSelector((state) => state.tasks.tasks);

  const alertTasks = tasks
    .filter((task) => {
      const diffTime = Math.abs(new Date(task.deadline) - new Date());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) < 7;
    })
    .filter((task) => !task.done);

  const sortedAlertTasks = alertTasks.sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );

  const { theme } = useSelector((state) => state.theme);

  return (
    <div className='upcoming-deadlines'>
      <h4 className={`${theme === 'DARK' ? 'text-light' : 'text-dark'} pb-2`}>
        Upcoming Deadlines:
      </h4>
      {sortedAlertTasks.map((task) => (
        <Alert key={task._id} variant='danger' className='h5' style={{width: '97%'}}>
          {task.taskName}
        </Alert>
      ))}
    </div>
  );
};

export default UpcomingDeadlines;
