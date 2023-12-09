import { Route, Routes } from 'react-router-dom';
import './App.css';
import AllTasks from './Containers/AllTasks';
import Hero from './Containers/Hero';
import Home from './Containers/Home';
// import PrivateRoute from './HOC/PrivateRoute';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/home' exact element={<Hero />} />
        <Route path='/all-tasks' exact element={<AllTasks />} />
        {/* <PrivateRoute path='/blogs' component={AllTasks} /> */}
        {/* <AdminRoute path="/createblog" component={CreateBlog} /> */}

        {/* <Route path="/signin" component={Signin} /> */}
        {/* <Route path="/signup" component={Signup} /> */}
      </Routes>
    </div>
  );
}

export default App;
