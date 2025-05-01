import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';
import CompletedTasks from './Containers/CompletedTasks';
import ForgotPassword from './Containers/forgot-password/ForgotPassword';
import Hero from './Containers/Hero';
import Home from './Containers/home/Home';
import AllTasks from './Containers/PendingTasks';
import PrivateRoute from './HOC/PrivateRoute';
// import { useSelector } from 'react-redux';
import { useCreateTask } from './services/tasks/tasks.data';
// import Footer from './Components/Footer';
import Header from './Components/header/Header';
import { notificationProperties } from './utils/formDate';

function App() {
  const notifyError = (error: string) => toast.error(error, notificationProperties);
  const notifySuccess = (msg: string) => toast.success(msg, notificationProperties);

  const token = JSON.parse(localStorage.getItem('auth') as string)?.token;

  // const { theme } = useSelector((state) => state.theme);

  const { mutateAsync: createTask } = useCreateTask();

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      if (!navigator.onLine) notifyError('You are offline!');
      else {
        notifySuccess('You are back online!');
        if (localStorage.getItem('task')) {
          createTask({ task: JSON.parse(localStorage.getItem('task') as string), token });
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
    // <div className={`App ${theme === 'LIGHT' ? 'theme-light' : 'theme-dark'}`}>
    <div className={`App`}>
      <Header />
      <div className='d-flex align-items-center' style={{ width: '90vw', height: 'calc(100vh - 100px)' }}>
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
      {/* <Footer /> */}
      <ToastContainer />
    </div>
  );
}

export default App;
