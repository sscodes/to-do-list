import { Route, Routes } from 'react-router-dom';
import './App.css';
import CompletedTasks from './Containers/CompletedTasks';
import Hero from './Containers/Hero';
import Home from './Containers/Home';
import AllTasks from './Containers/PendingTasks';
import PrivateRoute from './HOC/PrivateRoute';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
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
  );
}

export default App;
