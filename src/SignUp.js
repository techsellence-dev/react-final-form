import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import './App.css';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import signUpAut from './SignupAut'
Amplify.configure(awsconfig);

const initialValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirm: ''
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const onSubmit = async (values, onSubmitProps) => {
    await sleep(1000)
    alert('Submitted')
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()

    signUpAut(values.email, values.password,values.name)
    console.log(values.email)
    console.log(values.password)
    console.log(values.name)
}

//substitute to writing validations
const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().email('Invalid Email').required('Required!'),
})

const validate = values => {
    let errors = {}
    if (!values.password) {
        errors.password = 'Required'
    }
    if (!values.confirm) {
        errors.confirm = 'Required'
    }
    else if (values.confirm !== values.password) {
        errors.confirm = 'Must match'
    }
    return errors
}

function SignUp() {

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
                            <h1>Sign Up </h1><br></br><br></br>
                            <div>
                                <label>Name:</label>
                                <TextField
                                    variant='outlined'
                                    label='name'
                                    type='text'
                                    id='name'
                                    name='name'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    helperText='Enter your full name' />
                                <ErrorMessage name='name' component={TextError} />
                            </div>
                            <br></br>

                            <div>
                                <label>Email:</label>
                                <TextField
                                    variant='outlined'
                                    label='enter your email'
                                    size='small'
                                    type='text'
                                    id='email'
                                    name='email'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    helperText='This is your username' />
                                <ErrorMessage name='email' component={TextError} />
                            </div>
                            <br></br>
                            <div>
                                <label>Password:</label>
                                <TextField
                                    variant='outlined'
                                    type='password'
                                    id='password'
                                    name='password'
                                    label='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    helperText='minimum 4 charecters recommended' />
                                <ErrorMessage name='password' component={TextError} />
                            </div>
                            <br></br>
                            <div>
                                <label>Confirm Password:</label>
                                <TextField
                                    variant='outlined'
                                    type='password'
                                    id='confirm'
                                    name='confirm'
                                    label='confirm'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirm}
                                    helperText='Enter same as above field' />
                                <ErrorMessage name='confirm' component={TextError} />
                            </div>

                            <br></br>
                            <div>
                                <Button color='success' variant='contained' disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)} type='submit'>Submit</Button>|
                                <Button color='primary' variant='contained' type='reset' disabled={!formik.dirty}>Reset</Button>
                            </div>

                            <p>Already have an account? |
                                <Link style={{ textDecoration: 'none' }} to='/signin'> Sign In</Link>
                            </p>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}
export default SignUp