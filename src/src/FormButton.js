import * as React from 'react'
import { render } from 'react-dom'
import { Form, Field } from 'react-final-form'
// import './Style.css';
// import './App.css'
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { FormLabelProps } from '@mui/material';
import MenuItem from '@mui/material';
import Box from '@mui/material';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useState } from 'react';
import Phone from './Phone'




const required = value => (value ? undefined : 'Required')
const minValue = min => value =>
    value >= min ? undefined : `Should be greater than ${min}`
const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)

const sub = () => {
    console.log("Submitting , Please wait...");
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const Popp = async (values) => {
    await sleep(1000);
    alert("Submitted Successfully!");
    window.alert(JSON.stringify(values, undefined, 2));
};



function FormButton(props) {
    const [sent, setSent] = React.useState('Submit');
    const [phone, setPhone] = useState("");

    const handleClick = (e) => {
        console.log(e);
        setSent("submitting");
    };



    return (
        <div className='App'>
            <Form
                onSubmit={Popp}


                validate={values => {
                    const errors = {}
                    if (!values.Fusername) {
                        errors.username = 'Required'
                    }
                    if (!values.Lusername) {
                        errors.username = 'Required'
                    }
                    if (!values.Email) {
                        errors.Email = 'Required'
                    }
                    if (!values.age) {
                        errors.age = 'Required'
                    } if (!values.password) {
                        errors.password = 'Required'
                    } if (!values.confirm) {
                        errors.confirm = 'Required'
                    } else if (values.confirm != values.password) {
                        errors.confirm = 'Must match'
                    }
                    return errors
                }} >

                {({ handleSubmit, form, submitting, pristine, values }) => (


                    <form onSubmit={handleSubmit}>
                        {/* field 1 */}
                        <Field name="Fusername" validate={required} >
                            {({ input, meta }) => (

                                <div>
                                    <label>{props.Fusername}</label>
                                    <TextField
                                        {...input}
                                        helperText="Enter your first name"
                                        variant="filled"
                                        size="small"
                                        Id="outlined-required"
                                        label=""
                                    />
                                    {meta.touched && meta.error && <span>{meta.error}</span>}
                                </div>)}
                        </Field><br></br>


                        {/* field 2 */}
                        <Field name="Lusername" validate={required}>
                            {({ input, meta }) => (

                                <div>
                                    <label>{props.Lusername}</label>
                                    <TextField
                                        {...input}
                                        helperText="Enter your last name"
                                        variant="filled"
                                        size="small"
                                        Id="outlined-required"
                                        label=""
                                    />

                                    {meta.touched && meta.error && <span>{meta.error}</span>}
                                </div>)}

                        </Field><br></br>



                        {/* field 3 */}
                        <Field name="Email">
                            {({ input, meta }) => (

                                <div>
                                    <label><strong>{props.Email}</strong></label>
                                    <TextField
                                        type="email"
                                        {...input}
                                        variant="filled"
                                        size="small"
                                        Id="outlined-required"
                                        label=""

                                    />
                                    {meta.touched && meta.error && <span>{meta.error}</span>}
                                </div>)}
                        </Field><br></br>



                        {/* field 7 & 8 */}
                        <Field name="password">
                            {({ input, meta }) => (
                                <div>
                                    <label>{props.password} </label>
                                    <TextField
                                        type="password"
                                        {...input}
                                        variant="filled"
                                        size="small"
                                        Id="outlined-required"
                                        label="enter" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field><br></br>

                        <Field name="confirm">
                            {({ input, meta }) => (
                                <div>
                                    <label>{props.confirm}</label>
                                    <TextField
                                        helperText="enter the same as the above field"
                                        type="password"
                                        {...input}
                                        variant="filled"
                                        size="small"
                                        Id="outlined-required"
                                        label="confirm" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field><br></br>



                        <div>
                            <Button
                                variant="contained"
                                onClick={handleClick}
                                type="Button"
                                disabled={submitting || pristine}>
                                {sent}
                            </Button>|
                            <Button
                                variant="contained"
                                type="button"
                                onClick={form.reset}
                                disabled={submitting || pristine} >
                                Reset
                            </Button>
                            <pre>{JSON.stringify(values, undefined, 2)}</pre>
                        </div>

                    </form>

                )}
            </Form>

        </div>


    )
}

export default FormButton