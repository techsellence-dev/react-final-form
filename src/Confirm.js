import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
    code: '',
    password: '',
    confirm: ''
}

const onSubmit = (values,onSubmitProps) => {
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
    else if (values.confirm != values.password) {
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

            {formik =>{
                console.log('Formik props', formik)
                return(
                    <Form>
                        <h1>Reset Password</h1>
                        <div>
                            <label>Confirmation Code:</label>
                            <Field
                                type='text'
                                id='code'
                                name='code' />
                            <ErrorMessage name='code' component={TextError} />
                        </div>

                        <div>
                            <label>New Password:</label>
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
                        <button disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)} type='submit'>Submit</button>
                    </Form>
                )
            }}
        </Formik>
    )
}
export default NewForm