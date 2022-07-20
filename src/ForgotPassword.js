import React,{ useState} from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import { Link, useNavigate } from 'react-router-dom'
import './App.css';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import forgotAut from './ForgotAut'
Amplify.configure(awsconfig);

const initialValues = {
    email: ''
}

const validationSchema = Yup.object({
    email: Yup.string().email('Invalid Email').required('Required!'),
})

function NewForm() {
    const [err, shwErr] = useState()
    const navigate=useNavigate()
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const onSubmit = async (values, onSubmitProps) => {
        onSubmitProps.setSubmitting(false)
        onSubmitProps.resetForm()

        try {
            await forgotAut(values.email)
            console.log(values.email)
            navigate('/confirm')
        } catch (err) {
            switch (err?.code) {
                case "UserNotFoundException":
                    shwErr("Username combination not found.")
                    console.log("User not found")
                    navigate("/forgot")

            }
        }
    }


    return (
        <div className='Box'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}>

                {formik => {
                    return (
                        <Form>
                            <h1>Forgot Password:</h1>

                            <h3>A confirmation code will be sent to your email shortly.</h3><br></br>
                            <div>
                                <label className='Label'>Email:</label>
                                <TextField
                                    variant='outlined'
                                    label='email'
                                    size='small'
                                    type='text'
                                    id='email'
                                    name='email'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.email}
                                    helperText='Enter the email id registered to your account' />
                                <ErrorMessage name='email' component={TextError} />
                            </div>
                            <p className='err'>{err}</p> 
                            <br></br>
                            <div>
                                <Button color='primary' variant='contained' disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)} type='submit'>
                                    Submit
                                </Button>|
                                <Button color='primary' variant='contained' disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)} type='submit'>
                                    Resend Code
                                </Button>
                            </div>
                            <br></br><br></br>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
export default NewForm