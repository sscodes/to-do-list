import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import CompletedTasks from './Containers/CompletedTasks';
import ForgotPasword from './Containers/FogotPassword';
import Hero from './Containers/Hero';
import Home from './Containers/Home';
import AllTasks from './Containers/PendingTasks';
import PrivateRoute from './HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from './actions/taskActions';

function App() {
  const notificationProperties = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  };

  const dispatch = useDispatch();

  const notifyError = (error) => toast.error(error, notificationProperties);
  const notifySuccess = (error) => toast.success(error, notificationProperties);

  const token = useSelector((state) =>
    state.user.user.token ? state.user.user.token : state.auth.user.token
  );

  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      if (!navigator.onLine) notifyError('You are offline!');
      else {
        notifySuccess('You are back online!');
        if (localStorage.getItem('task')) {
          dispatch(createTask(JSON.parse(localStorage.getItem('task')), token));
        }
      }
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  return (
    <div className={`App ${theme === 'LIGHT' ? 'theme-light' : 'theme-dark'}`}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/forgotpassword' element={<ForgotPasword />} />
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
      <ToastContainer />
    </div>
  );
}

export default App;
