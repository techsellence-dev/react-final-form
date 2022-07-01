import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import './App.css';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import confirmSignUpAut from './ConfirmSignUpAut'
Amplify.configure(awsconfig);

const initialValues = {
    username: '',
    code: '',
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const onSubmit = async (values, onSubmitProps) => {
    await sleep(1000)
    alert('Submitted')
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()

    confirmSignUpAut(values.username,values.code)
}

//substitute to writing validations
const validationSchema = Yup.object({
    username: Yup.string().email('Invalid Email').required('Required!'),
    code: Yup.string().required('Required!'),
})

function ConfirmSignUp() {

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
                            <h1>Confirm Sign up </h1><br></br><br></br>
                            <h3>Enter the code recieved on your email to confirm sign up</h3>
                            <div>
                                <label>Username:</label>
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
                                    helperText='Enter your username' />
                                <ErrorMessage name='username' component={TextError} />
                            </div>
                            <br></br>
                            <div>
                                <label>Code:</label>
                                <TextField
                                    variant='outlined'
                                    label='Code'
                                    type='text'
                                    id='code'
                                    name='code'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.code}
                                    helperText='Enter your registered password' />
                                <ErrorMessage name='code' component={TextError} />
                            </div>

                            <br></br>
                            <div>
                                <Button color='primary' variant='contained' disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)} type='submit'>Submit</Button>|
                                <Button color='primary' variant='contained' type='reset' disabled={!formik.dirty}>Reset</Button>
                            </div>
                        </Form>
                    </div>
                )
            }}
        </Formik>
    )
}
export default ConfirmSignUp