import { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import { useReadTask } from '../../../../services/tasks/tasks.data';
import { ReadTasksResponse } from '@/types/tasks';
import { Value as DateValue } from 'node_modules/react-calendar/dist/esm/shared/types';
import clsx from 'clsx';
import classes from './UpcomingDeadlines.module.css';

const UpcomingDeadlines = () => {
  const [tasks, setTasks] = useState<ReadTasksResponse[] | null>();
  const token = JSON.parse(localStorage.getItem('auth') as string)?.token;

  const {
    tasks: allTasks,
    isPending: isGetTasksPending,
    isError: isGetTasksError,
  } = useReadTask(token);

  useEffect(() => {
    if (!isGetTasksPending && !isGetTasksError && Array.isArray(allTasks)) {
      const alertTasks = allTasks
        .filter((task) => {
          // Skip tasks with null or invalid deadlines
          if (!task.deadline) return false;

          // Convert deadline to timestamp based on its type
          let deadlineTimestamp: number;

          if (task.deadline instanceof Date) {
            deadlineTimestamp = task.deadline.getTime();
          } else if (Array.isArray(task.deadline)) {
            // If it's a range, use the first date
            if (!task.deadline[0]) return false;
            deadlineTimestamp = task.deadline[0].getTime();
          } else if (
            typeof task.deadline === 'string' ||
            typeof task.deadline === 'number'
          ) {
            // If it's a string or number, create a Date
            deadlineTimestamp = new Date(task.deadline).getTime();
          } else {
            // Unknown format, skip this task
            return false;
          }

          const currentTimestamp = new Date().getTime();
          const diffTime = Math.abs(deadlineTimestamp - currentTimestamp);
          return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) < 7;
        })
        .filter((task) => !task.done);

      const sortedAlertTasks = alertTasks.sort((a, b) => {
        // Helper function to get timestamp from deadline
        const getDeadlineTimestamp = (deadline: DateValue): number => {
          if (!deadline) return Infinity; // Put null deadlines at the end

          if (deadline instanceof Date) {
            return deadline.getTime();
          } else if (Array.isArray(deadline)) {
            return deadline[0] ? deadline[0].getTime() : Infinity;
          } else if (
            typeof deadline === 'string' ||
            typeof deadline === 'number'
          ) {
            return new Date(deadline).getTime();
          }
          return Infinity;
        };

        return (
          getDeadlineTimestamp(a.deadline) - getDeadlineTimestamp(b.deadline)
        );
      });

      setTasks(sortedAlertTasks);
    }
  }, [isGetTasksPending, isGetTasksError, allTasks]);

  // const { theme } = useSelector((state) => state.theme);

  return (
    <div className='upcoming-deadlines'>
      <h4
        className={`${
          'pb-2' // && theme === 'DARK' ? 'text-light' : 'text-dark'
        }`}
      >
        Upcoming Deadlines:
      </h4>
      {tasks?.map((task) => (
        <Alert
          key={task._id}
          variant='danger'
          className={clsx(classes.alert, 'h5')}
        >
          {task.taskName}
        </Alert>
      ))}
    </div>
  );
};

export default UpcomingDeadlines;
