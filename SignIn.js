import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
    username: '',
    password: '',
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
                    <Form>
                        <h1>Sign In</h1>
                        <div>
                            <label>Username:</label>
                            <Field
                                type='text'
                                id='username'
                                name='username' />
                            <ErrorMessage name='username' component={TextError} />
                        </div>


                        <div>
                            <label>Password:</label>
                            <Field
                                type='password'
                                id='password'
                                name='password' />
                            <ErrorMessage name='password' component={TextError} />
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
export default NewForm