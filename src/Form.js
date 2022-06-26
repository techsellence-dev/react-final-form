import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const initialValues = {
    name1: '',
    name2: '',
    email: '',

}

const onSubmit = values => {
    console.log('Form Data', values)
}

// const validate = values => {
//     let errors = {}

//     if (!values.name1) {
//         errors.name1 = 'Required'
//     }
//     if (!values.name2) {
//         errors.name2 = 'Required'
//     }
//     if (!values.email) {
//         errors.email = 'Required'
//     }
//     else if (!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i.test(values.email)) {
//         errors.email = 'Email not valid'
//     }

//     return errors
// }

//substitute to writing validations
const validationSchema= Yup.object({
    name1:Yup.string().required('Required!'),
    name2: Yup.string().required('Required!'),
    email:Yup.string().email('Invalid Email').required('Required!')
})

function Form() {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    console.log('Form Errors', formik.errors)
    console.log('Visited fields', formik.touched)

    return (
        <div className='App'>

            <form onSubmit={formik.handleSubmit}>
                <div className='form-control'>
                    <label>First Name</label>
                    <input
                        type='text'
                        id='name1'
                        name='name1'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name1} />
                    {formik.touched.name1 && formik.errors.name1 ? <div className='error'>{formik.errors.name1}</div> : null}
                </div>

                <div className='form-control'>
                    <label>Last Name</label>
                    <input
                        type='text'
                        id='name2'
                        name='name2'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name2} />
                    {formik.touched.name2   && formik.errors.name2 ? <div className='error'>{formik.errors.name2}</div> : null}
                </div>
                <div className='form-control'>
                    <label>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        {...formik.getFieldProps('email')} />

                    {/* onChange = {formik.handleChange}
                    onBlur = {formik.handleBlur}
                    value = {formik.values.email}  => can be replaced by {...formik.getFieldProps('field name')} */}

                    {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
                </div>

                <button type='submit'>Submit</button>
            </form>
        </div >
    )
}

export default Form