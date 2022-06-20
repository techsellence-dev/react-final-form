import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Switch, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup'
import Signin from './Signin';
import Phone from './Phone';
import Password from './components/Password';
import ForgotPassword from './ForgotPassword'
import Confirm from './Confirm'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <>
 <Router>
    <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        <Route path='/confirm' element={<Confirm/>}/>
    </Routes>
 </Router>
 
 </>
 
);

