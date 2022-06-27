import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn'
import ForgotPassword from './ForgotPassword'
import Confirm from './Confirm'
import SignUp from './SignUp';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <Routes>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/forgot' element={<ForgotPassword/>}/>
        <Route path='/confirm' element={<Confirm/>}/>
      </Routes>
    </Router>
  </>

);
