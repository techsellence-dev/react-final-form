import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import './App.css';

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
    console.log('submitted')
    console.log('Form Data', values)
    alert('Submitted')
    console.log('Submit Props', onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}

//substitute to writing validations
const validationSchema = Yup.object({
    name: Yup.string().required('Required!'),
    username: Yup.string().required('Required!'),
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
                console.log('Formik props', formik)
                return (
                    <div className='Box'>
                        <Form>
                            <h1>Sign Up </h1><br></br>
                            <div>
                                <label>Name:</label>
                                <TextField
                                    variant='outlined'
                                    label='Name'
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
                                <label>Username:</label>
                                <TextField
                                    variant='outlined'
                                    label='Username'
                                    type='text'
                                    id='username'
                                    name='username'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.username}
                                    helperText='Create an username' />
                                <ErrorMessage name='username' component={TextError} />
                            </div>
                            <br></br>
                            <div>
                                <label>Email:</label>
                                <TextField
                                    variant='outlined'
                                    label='Email'
                                    size='small'
                                    type='text'
                                    id='email'
                                    name='email'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    helperText='Enter your email address' />
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
                                <Button color='primary' variant='contained' disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)} type='submit'>Submit</Button>|
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