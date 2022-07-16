import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import SignIn from './SignIn'
import ForgotPassword from './ForgotPassword'
import Confirm from './Confirm'
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';
import { AuthProvider } from './Protected2'
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
    </AuthProvider>
  </BrowserRouter>

);
