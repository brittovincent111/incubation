import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import User from './stores/UserContext';
import Application from './stores/ApplicationContext'
import Signup from '../src/pages/user/SignupPage'
import Login from '../src/pages/user/LoginPage'
import HomePage from '../src/pages/user/Homepage'
import SuccessPage from '../src/pages/user/SuccessPage'
import AdminHomePage from '../src/pages/admin/AdminHome'
import AdminLoginPage from './pages/admin/LoginPage';
import ApplicationPage from '../src/pages/user/ApplicationPage';
import ApprovePage from './pages/admin/ApprovePage';
import RejectPage from './pages/admin/RejectPage';
import CreateSlotPage from './pages/admin/CreateSlotPage';
import SlotPage from './pages/admin/SlotPage';
import ProgressPage from './pages/admin/ProgressPage';


function App() {
  return (
    <div >
       <User>
        <Application>
    
      <Router>
       

        
        <Routes >
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}> </Route>
          <Route path='/' element={<HomePage />}> </Route>
          <Route path='/application' element={<ApplicationPage />}> </Route>
          <Route path='/success' element={<SuccessPage />}> </Route>
        </Routes>
        
        <Routes>
          <Route path='/admin/login' element={<AdminLoginPage />} ></Route>
          <Route path='/admin' element={<AdminHomePage />} ></Route>
          <Route path='/approved' element={<ApprovePage />} ></Route>
          <Route path='/rejected' element={<RejectPage/>} ></Route>
          <Route path='/createslot' element={<CreateSlotPage/>} ></Route>
          <Route path='/slot' element={<SlotPage/>} ></Route>
          <Route path='/progress' element={<ProgressPage/> } ></Route>



        </Routes>
        
   
     
      </Router>
      </Application>
      </User>
      
    </div>
  );
}

export default App;
