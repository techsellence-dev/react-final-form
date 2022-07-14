import React from 'react'
import { useState } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import { TextField } from '@mui/material'
import { Button } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
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


const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const onSubmit = async (values, onSubmitProps) => {
    await sleep(1000)
    console.log('Submitted')
    console.log('Form Data', values)
    console.log('Submit Props', onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()

    confirmAut(values.email, values.code, values.password)
}

//substitute to writing validations
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
    const [showPwd, Setshown] = useState(false)
    const[icon, setIcon]=useState(<VisibilityOffIcon/>)
    const TogglePassword = () => {
        setIcon(<VisibilityIcon/>)
        Setshown(!showPwd)
    }
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
                            <h1>Reset Password </h1><br></br><br></br>
                            <div>
                                <label>Username:</label>
                                <TextField
                                    variant='outlined'
                                    label='enter your registered email'
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
                            </div>
                            <br></br>
                            <div>

                                <label>New Password:</label>
                                <TextField
                                    variant='outlined'
                                    label='password'
                                    type={showPwd ? "text" : "password"}
                                    id='password'
                                    name='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}/><br></br>
                                <div className='toggle'> <Button color='secondary' size='small' type='button' onClick={TogglePassword} startIcon={icon}>Show Password</Button></div>
                                <ErrorMessage name='password' component={TextError} />

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