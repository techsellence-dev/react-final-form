import React from 'react'
import { useState } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import { useAuth } from './Protected2'
import { Link , useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField'
import  Button  from '@mui/material/Button'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import './App.css';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import signinAut from './SigninAut'
Amplify.configure(awsconfig);

const initialValues = {
    username: '',
    password: '',
}

//substitute to writing validations
const validationSchema = Yup.object({
    username:Yup.string().email('Invalid Email').required('Required!'),
    password: Yup.string().required('Required!'),
})

function NewForm() {
    const [errMsg, setErrMsg] = useState('');
    const { setAuth } = useAuth()
    const [showPwd, Setshown] = useState(false)
    const [icon, setIcon] = useState(<VisibilityOffIcon />)
    const TogglePassword = () => {
        setIcon(<VisibilityIcon />)
        Setshown(!showPwd)
    }
    const navigate=useNavigate()
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const handleSubmit = async (values, onSubmitProps) => {
        await sleep(1000)
        alert('Submitted')
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()
        navigate('/home')
       
        signinAut(values.username, values.password)
        console.log(values.username)
        console.log(values.password)

        try {
            setAuth(values.username)
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
        }
       
    }


    return (
        
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}>

            {formik => {
                console.log('Formik Props', formik)
                return (
                    <div className='Box'>
                        <Form>
                            <h1>Sign In </h1><br></br><br></br>
                            <div>
                                <label>Email:</label>
                                <TextField
                                    variant='outlined'
                                    label='username'
                                    size='small'
                                    type='text'
                                    id='username'
                                    name='username'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username} 
                                    helperText='Enter your username'/>
                                <ErrorMessage name='username' component={TextError} />
                            </div>
<br></br>
                            <div>
                                <label>Password:</label>
                                <TextField
                                    variant='outlined'
                                    label='password'
                                    type={showPwd ? "text" : "password"}
                                    id='password'
                                    name='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password} 
                                    helperText='Enter your registered password'/>
                                <ErrorMessage name='password' component={TextError} />
                            </div>
                            <div className='toggle'> <Button color='secondary' size='small' type='button' onClick={TogglePassword} startIcon={icon}>Show Password</Button></div>
                            <br></br>
                            <br></br>
                            <div>
                                <Button color='primary' variant='contained' disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)} type='submit'>Submit</Button>|
                                <Button color='primary' variant='contained' type='reset' disabled={!formik.dirty}>Reset</Button>
                            </div>

                            <p>Forgot password? |  <Link style={{ textDecoration: 'none' }} to='/forgot'> forgot password</Link></p>
                            <p>Don't have an account |  <Link style={{ textDecoration: 'none' }} to='/'> Sign Up</Link></p>
                        </Form>
                        <p>{errMsg}</p>
                    </div>
                )
            }}
        </Formik>
    )
}
export default NewForm