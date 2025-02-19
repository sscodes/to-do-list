import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useReadTask } from '../services/tasks/tasks.data';

const UpcomingDeadlines = () => {
  const [tasks, setTasks] = useState([]);
  const token = useSelector((state) =>
    state.user.user.token ? state.user.user.token : state.auth.user.token
  );

  const {
    tasks: allTasks,
    isPending: isGetTasksPending,
    isError: isGetTasksError,
  } = useReadTask(token);

  useEffect(() => {
    if (!isGetTasksPending && !isGetTasksError && Array.isArray(allTasks)) {
      const alertTasks = allTasks
        .filter((task) => {
          const diffTime = Math.abs(new Date(task.deadline) - new Date());
          return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) < 7;
        })
        .filter((task) => !task.done);

      const sortedAlertTasks = alertTasks.sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
      );
      setTasks(sortedAlertTasks);
    }
  }, [isGetTasksPending, isGetTasksError, allTasks]);

  const { theme } = useSelector((state) => state.theme);

  return (
    <div className='upcoming-deadlines'>
      <h4 className={`${theme === 'DARK' ? 'text-light' : 'text-dark'} pb-2`}>
        Upcoming Deadlines:
      </h4>
      {tasks.map((task) => (
        <Alert
          key={task._id}
          variant='danger'
          className='h5'
          style={{ width: '97%' }}
        >
          {task.taskName}
        </Alert>
      ))}
    </div>
  );
};

export default UpcomingDeadlines;
