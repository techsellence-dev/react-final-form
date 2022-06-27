import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import { TextField } from '@mui/material'
import { Button } from '@mui/material';
import './App.css';

const initialValues = {
    code: '',
    password: '',
    confirm: ''
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const onSubmit = async (values, onSubmitProps) => {
    await sleep(1000)
    console.log('Submitted')
    console.log('Form Data', values)
    console.log('Submit Props', onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}

//substitute to writing validations
const validationSchema = Yup.object({
    code: Yup.string().required('Required!'),
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

function NewForm() {

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
                            <h1>Reset Password </h1><br></br>
                            <div>
                                <label>Confirm Code:</label>
                                <TextField
                                    variant='outlined'
                                    size='small'
                                    type='text'
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
                                    type='password'
                                    id='password'
                                    name='password'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    helperText='Enter a new password' />
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
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.confirm}
                                    helperText='Enter the same as above' />
                                <ErrorMessage name='confirm' component={TextError} />
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
