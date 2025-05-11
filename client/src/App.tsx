import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import CompletedTasks from './modules/tasks/containers/completed-tasks/CompletedTasks';
import Hero from './modules/tasks/containers/hero/Hero';
import Home from './modules/auth/containers/home/Home';
import AllTasks from './modules/tasks/containers/pending-tasks/PendingTasks';
import PrivateRoute from './HOC/private-route/PrivateRoute';
// import { useSelector } from 'react-redux';
import { useCreateTask } from './services/tasks/tasks.data';
import Header from './components/header/Header';
import { notificationProperties } from './utils/constants';
import useOnlineStatus from './hooks/useOnlineStatus';
import ForgotPassword from './modules/auth/containers/forgot-password/ForgotPassword';

function App() {
  const notifyError = (error: string) =>
    toast.error(error, notificationProperties);
  const notifySuccess = (msg: string) =>
    toast.success(msg, notificationProperties);

  const token = JSON.parse(localStorage.getItem('auth') as string)?.token;

  // const { theme } = useSelector((state) => state.theme);

  const { mutateAsync: createTask } = useCreateTask();

  const handleReconnect = () => {
    if (localStorage.getItem('task')) {
      createTask({
        task: JSON.parse(localStorage.getItem('task') as string),
        token,
      });
    }
  };

  useOnlineStatus({
    onOffline: () => notifyError('You are offline!'),
    onOnline: () => notifySuccess('You are back online!'),
    onReconnect: handleReconnect,
  });

  return (
    // <div className={`App ${theme === 'LIGHT' ? 'theme-light' : 'theme-dark'}`}>
    <div className={`App`}>
      <Header />
      <div
        className='d-flex align-items-center'
        style={{ width: '90vw', height: 'calc(100vh - 100px)' }}
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route
            path='/home'
            element={
              <PrivateRoute>
                <Hero />
              </PrivateRoute>
            }
          />
          <Route
            path='/pending-tasks'
            element={
              <PrivateRoute>
                <AllTasks />
              </PrivateRoute>
            }
          />
          <Route
            path='/completed-tasks'
            element={
              <PrivateRoute>
                <CompletedTasks />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
