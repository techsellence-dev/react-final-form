import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
    name1: '',
    name2: '',
    email: '',
    password: '',
    confirm: ''
}

const onSubmit = (values,onSubmitProps) => {
    console.log('Form Data', values)
    alert('Submitted')
    console.log('Submit Props', onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}

//substitute to writing validations
const validationSchema = Yup.object({
    name1: Yup.string().required('Required!'),
    name2: Yup.string().required('Required!'),
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
    else if (values.confirm != values.password) {
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
                    <Form>
                        <h1>Sign Up</h1>
                        <div>
                            <label>First Name:</label>
                            <Field
                                type='text'
                                id='name1'
                                name='name1' />
                            <ErrorMessage name='name1' component={TextError} />
                        </div>

                        <div>
                            <label>Last Name:</label>
                            <Field
                                type='text'
                                id='name2'
                                name='name2' />
                            <ErrorMessage name='name2' >
                                {
                                    (ErrorMsg) => <div className='error'>{ErrorMsg}</div>
                                }
                            </ErrorMessage>
                        </div>

                        <div>
                            <label>Email:</label>
                            <Field
                                type='text'
                                id='email'
                                name='email' />
                            <ErrorMessage name='email' component={TextError} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <Field
                                type='password'
                                id='password'
                                name='password' />
                            <ErrorMessage name='password' component={TextError} />
                        </div>
                        <div>
                            <label>Confirm Password:</label>
                            <Field
                                type='password'
                                id='confirm'
                                name='confirm' />
                            <ErrorMessage name='confirm' component={TextError} />
                        </div>


                        <br></br>
                        <div>
                        <button disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)} type='submit'>Submit</button>|
                        <button type='reset' disabled={!formik.dirty}>Reset</button>
                        </div>
                    </Form>
                )
            }
            }
        </Formik>
    )
}
export default SignUp