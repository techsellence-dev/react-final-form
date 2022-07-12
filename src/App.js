import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn'
import ForgotPassword from './ForgotPassword'
import Confirm from './Confirm'
import SignUp from './SignUp';
import ConfirmSignUp from './ConfirmSignUp';
import { AuthProvider } from './Protected2'
import { RequireAuth } from './RequireAuth';
import Admin from './Roles/Admin'
import Editor from './Roles/Editor'
import Home from './Roles/Home'
import Lounge from './Roles/Lounge'
import RequireAuth2 from './RequireAuth2';
import Unauthorized from './Roles/Unauthorized';
import Missing from './Missing';
import LinkPage from './LinkPage';
import './index.css';

const ROLES = {
    'user': 'amidebu610@gmail.com' ,
    'editor': 1984,
    'admin': 5150
}

function App() {
    return (
        <Routes>
            <Route path='/' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/forgot' element={<ForgotPassword />} />
            <Route path='/confirm' element={<Confirm />} />
            <Route path='/unauthorized' element={<Unauthorized />} />
            <Route path='/confirmsignup' element={<ConfirmSignUp />} />

            <Route element={<RequireAuth2 allowedRoles={[ROLES.user]} />}>
                <Route path="/home" element={<Home />} />
            </Route>
            <Route element={<RequireAuth2 allowedRoles={[ROLES.editor]} />}>
                <Route path="/editor" element={<Editor />} />
            </Route>
            <Route element={<RequireAuth2 allowedRoles={[ROLES.admin]} />}>
                <Route path="/admin" element={<Admin />} />
            </Route>
            <Route element={<RequireAuth2 allowedRoles={[ROLES.editor, ROLES.admin]} />}>
                <Route path="/lounge" element={<Lounge />} />
            </Route>

            <Route path="*" element={<Missing />} />
            <Route path='links' element={<LinkPage/>}/>
        </Routes>
    )
}

export default App