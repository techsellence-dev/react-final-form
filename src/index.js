import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SignIn from './SignIn'
import ForgotPassword from './ForgotPassword'
import Confirm from './Confirm'
import SignUp from './SignUp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  {/* <Form/> */}
  <SignUp/>
  <SignIn/>
  <ForgotPassword/>
  <Confirm/>
  </>

);
