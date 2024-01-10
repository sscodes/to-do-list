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

  const notifyError = (error) => toast.error(error, notificationProperties);
  const notifySuccess = (error) => toast.success(error, notificationProperties);

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      if (!navigator.onLine) notifyError('You are offline!');
      else notifySuccess('You are back online!');
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='App'>
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
