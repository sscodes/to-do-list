import Task from '../../components/task/Task.js';
import SearchTask from '../../components/search-task/SearchTask.js';
import { Button, Col, Container, Row } from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReadTask } from '../../../../services/tasks/tasks.data.js';
import { ReadTasksResponse } from '@/types/tasks.ts';
import Header from '@/components/header/Header.js';
import classes from './CompletedTasks.module.css';

const CompletedTasks = () => {
  const [searchedText, setSearchedText] = useState('');
  const [tasksOnFilter, setTasksOnFilter] = useState<
    ReadTasksResponse[] | null
  >();
  const [tasks, setTasks] = useState<ReadTasksResponse[] | null>();
  const token = JSON.parse(localStorage.getItem('auth') as string)?.token;

  const {
    tasks: allTasks,
    isPending: isGetTasksPending,
    isError: isGetTasksError,
  } = useReadTask(token);

  // TODO: create different APIs for completed and pending tasks
  useEffect(() => {
    if (!isGetTasksPending && !isGetTasksError) {
      const completedTasks = allTasks?.filter((task) => task.done);
      setTasks(completedTasks);
    }
  }, [isGetTasksPending, isGetTasksError, allTasks]);

  useEffect(() => {
    if (searchedText.length > 0) {
      const filteredTasks = tasks?.filter((task) =>
        task.taskName.toLowerCase().includes(searchedText.toLowerCase())
      );
      setTasksOnFilter(filteredTasks);
    } else setTasksOnFilter([]);
  }, [searchedText]);

  const navigate = useNavigate();

  // const { theme } = useSelector((state) => state.theme);

  return (
    <>
      <Header />
      {!isGetTasksPending && !isGetTasksError && (
        <Container className='pt-3'>
          <Row>
            <div className='d-flex justify-content-center pb-2'>
              <div className={classes.searchSection}>
                <SearchTask
                  setSearchedText={setSearchedText}
                  placeholder='Search Completed Tasks...'
                />
              </div>
            </div>
          </Row>
          <Row>
            {tasksOnFilter?.length === 0 && searchedText.length !== 0 && (
              <div className='d-flex justify-content-center task-not-found'>
                <div className='border-2 border-black'>
                  <h4
                  // className={`${
                  //   theme === 'DARK' ? 'text-light' : 'text-dark'
                  // }`}
                  >
                    No such task found...
                  </h4>
                  <div className='d-flex justify-content-center'>
                    <Button onClick={() => navigate('/')} variant='dark'>
                      Add tasks
                    </Button>
                  </div>
                </div>
              </div>
            )}
            {tasksOnFilter?.length === 0 && searchedText.length === 0
              ? tasks?.map((task) => (
                  <Col className='py-2' xs={12} sm={4} lg={3} key={task._id}>
                    <Task
                      id={task._id}
                      title={task.taskName}
                      details={task.taskDetail}
                      deadline={task.deadline}
                      done={task.done}
                    />
                  </Col>
                ))
              : tasksOnFilter?.map((task) => (
                  <Col className='py-2' xs={12} sm={4} lg={3} key={task._id}>
                    <Task
                      id={task._id}
                      title={task.taskName}
                      details={task.taskDetail}
                      deadline={task.deadline}
                      done={task.done}
                    />
                  </Col>
                ))}
          </Row>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

export default CompletedTasks;
