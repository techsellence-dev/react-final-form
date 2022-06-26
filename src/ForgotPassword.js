import React from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'
import './App.css';

const initialValues = {
    email: ''
}

const onSubmit = (values, onSubmitProps) => {
    console.log('Form Data', values)
    alert('A verification code will be sent to your email shortly')
    console.log('Submit Props',onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
    
}

//substitute to writing validations
const validationSchema = Yup.object({

    email: Yup.string().email('Invalid Email').required('Required!'),
})


function NewForm() {

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>

            {formik =>{
                console.log('Formik props', formik)
                return(
                    <Form>
                        <h1>Forgot Password:</h1>


                        <div>
                            <label>Email:</label>
                            <Field
                                type='text'
                                id='email'
                                name='email' />
                            <ErrorMessage name='email' component={TextError} />
                        </div>


                        <br></br>
                        <button disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)} type='submit'>Submit</button>
                    </Form>
                )
            }
            }
        </Formik>
    )
}
export default NewForm
