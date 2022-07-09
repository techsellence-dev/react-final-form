import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn'
import ForgotPassword from './ForgotPassword'
import Confirm from './Confirm'
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';
import { AuthProvider } from './Protected2'
import { RequireAuth } from './RequireAuth';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/forgot' element={<ForgotPassword />} />
        <Route path='/confirm' element={<Confirm />} />
        <Route path='/confirmsignup' element={<RequireAuth><ConfirmSignUp /></RequireAuth>} />
      </Routes>
    </Router>
  </AuthProvider>

);
