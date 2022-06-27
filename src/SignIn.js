import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import  Button  from '@mui/material/Button'
import './App.css';

const initialValues = {
    username: '',
    password: '',
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const onSubmit = async (values, onSubmitProps) => {
    await sleep(1000)
    console.log('Submitted')
    console.log('Form Data', values)
    alert('Submitted')
    console.log('Submit Props', onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}

//substitute to writing validations
const validationSchema = Yup.object({
    username: Yup.string().required('Required!'),
    password: Yup.string().required('Required!'),
})

function NewForm() {

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>

            {formik => {
                console.log('Formik Props', formik)
                return (
                    <div className='Box'>
                        <Form>
                            <h1>Sign In </h1><br></br>
                            <div>
                                <label>Username:</label>
                                <TextField
                                    variant='outlined'
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
                                    type='password'
                                    id='password'
                                    name='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password} 
                                    helperText='Enter your registered password'/>
                                <ErrorMessage name='password' component={TextError} />
                            </div>

                            <br></br>
                            <div>
                                <Button color='primary' variant='contained' disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)} type='submit'>Submit</Button>|
                                <Button color='primary' variant='contained' type='reset' disabled={!formik.dirty}>Reset</Button>
                            </div>

                            <p>Forgot password? |  <Link style={{ textDecoration: 'none' }} to='/forgot'> forgot password</Link></p>
                            <p>Don't have an account |  <Link style={{ textDecoration: 'none' }} to='/signup'> Sign Up</Link></p>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}
export default NewForm