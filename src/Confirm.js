import React from 'react'
import { useState } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import { TextField } from '@mui/material'
import { Button } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom'
import './App.css';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import confirmAut from './ConfirmAut';
Amplify.configure(awsconfig);

const initialValues = {
    email: '',
    code: '',
    password: '',
}

const validationSchema = Yup.object({
    code: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid Email').required('Required!'),
})
const validate = values => {
    let errors = {}
    if (!values.password) {
        errors.password = 'Required'
    }
    return errors
}

function NewForm() {
    const [err, shwErr] = useState()
    const navigate = useNavigate()
    const [showPwd, Setshown] = useState('password')
    const [hide, shwHide] = useState('Show Password')
    const [icon, setIcon] = useState(<VisibilityOffIcon />)
    const TogglePassword = () => {
        if (showPwd == 'password') {
            setIcon(<VisibilityIcon />)
            Setshown('text')
            shwHide('Hide Password')
        }
        else {
            setIcon(<VisibilityOffIcon />)
            Setshown('password')
            shwHide('Show Password')
        }
    }
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const onSubmit = async (values, onSubmitProps) => {
        await sleep(1000)
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()

        try {
            await confirmAut(values.email, values.code, values.password)
            console.log(values.email);
            console.log(values.code);
            console.log(values.password);
            navigate('/signin')
        } catch (err) {
            switch (err?.code) {
                case "CodeMismatchException":
                    console.log("Wrong code , please try again")
                    shwErr("Wrong code , please try again")
                    navigate('/confirm')
                    break;
                case "UserNotFoundException":
                    console.log("Email is not registered")
                    alert("Email is not registered");
                    navigate("/confirm");
            }
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            validate={validate}>

            {formik => {
                return (
                    <div className='Box'>
                        <Form>
                            <h1>Reset Password </h1><br></br><br></br>
                            <div>
                                <label>Email:</label>
                                <TextField
                                    variant='outlined'
                                    label='email'
                                    helperText='Enter your registered email'
                                    size='small'
                                    type='text'
                                    id='email'
                                    name='email'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                />
                                <ErrorMessage name='email' component={TextError} />
                            </div>
                            <br></br>
                            <div>
                                <label>Confirm Code:</label>
                                <TextField
                                    variant='outlined'
                                    label='confirmation code'
                                    type='text'
                                    size='small'
                                    id='code'
                                    name='code'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.code}
                                    helperText='Enter the code' />
                                <ErrorMessage name='code' component={TextError} />
                                <p className='err'>{err}</p>
                            </div>
                            <br></br>
                            <div>

                                <label>New Password:</label>
                                <TextField
                                    variant='outlined'
                                    label='password'
                                    type={showPwd}
                                    id='password'
                                    name='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password} /><br></br>
                                <ErrorMessage name='password' component={TextError} />
                                <div className='toggle'> <Button color='secondary' size='small' type='button' onClick={TogglePassword} startIcon={icon}>{hide}</Button></div>
                            </div>

                            <br></br>
                            <div>
                                <Button color='primary' variant='contained' disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)} type='submit'>
                                    Submit
                                </Button>
                            </div>
                            <br></br><br></br>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}
export default NewForm