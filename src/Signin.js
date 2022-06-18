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
import { Box } from '@mui/material';
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useState } from 'react';
import Phone from './Phone'





const required = value => (value ? undefined : 'Required')

// const minValue = min => value =>
//     value >= min ? undefined : `Should be greater than ${min}`
// const composeValidators = (...validators) => value =>
//     validators.reduce((error, validator) => error || validator(value), undefined)



const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// const Popp = async (values) => {
//     await sleep(1000);
//     alert("Submitted Successfully!");

// };



function FormButton() {
    const [sent, setSent] = React.useState('Sign In');
    const sub = (formObj) => {
        console.log("Submitting , Please wait...");
        console.log(formObj)
        setSent("Please Wait");

    };

    // const handleClick = (e) => {
    //     console.log(e);
    //     console.log("Submitted");
    //     setSent("submitting");

    // };

    // const emailvalid=()=>{
    //     const regEx=/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
    //     if(regEx.test(Email))
    // }

    return (
        <div className='App'>
          
            <Form
                onSubmit={async (values) => {
                    await sleep(1000);
                    alert("Submitted Successfully!");
                    window.alert(JSON.stringify(values, undefined, 2));


                }}


                validate={values => {
                    const errors = {}
                    if (!values.Fusername) {
                        errors.username = 'Required'
                    }if (!values.Email) {
                        errors.Email = 'Required'
                    }
                    // if (values.Email != /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g); {
                    //     errors.Email = 'Invalid Email'
                    // }
                   if (!values.password) {
                        errors.password = 'Required'
                    } 
                    return errors
                }} >

                {({ handleSubmit, form, submitting, pristine, values }) => (


                    <form onSubmit={handleSubmit}><h1>SIGN IN:</h1>

                        {/* field 1 */}
                        <Field name="Fusername" validate={required} >
                            {({ input, meta }) => (

                                <div>
                                    <label>Username</label>
                                    <TextField
                                        {...input}
                                        margin='normal'
                                        helperText="Enter your first name name"
                                        variant="outlined"
                                        size="small"
                                        id="outlined-required"
                                        label="First name"
                                        autoFocus
                                    />
                                    {meta.touched && meta.error && <span>{meta.error}</span>}
                                </div>)}
                        </Field><br></br>


                       
                        



                        {/* field 3 */}
                        <Field name="Email">
                            {({ input, meta }) => (

                                <div>
                                    <label><strong>Email: </strong></label>
                                    <TextField
                                        {...input}
                                        margin="normal"
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        size='small'
                                        autoComplete="email"

                                    />
                                    {meta.touched && meta.error && <span>{meta.error}</span>}
                                </div>)}
                        </Field><br></br>

                     
                        <Field name="password">
                            {({ input, meta }) => (
                                <div>
                                    <label>Password: </label>
                                    <TextField
                                        type="password"
                                        {...input}
                                        variant="filled"
                                        size="small"
                                        id="outlined-required"
                                        label="enter" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field><br></br>

                       
                        <Button
                            disabled={submitting || pristine}
                            variant="contained"
                            onClick={sub}
                            type="submit"
                        >
                            {sent}
                        </Button>|
                        <Button
                            variant="contained"
                            type="button"
                            onClick={form.reset}
                            disabled={submitting || pristine} >
                            Reset
                        </Button>





                        <div>

                        </div>
                        <pre>{JSON.stringify(values, 0, 2)}</pre>

                    </form>

                )}
            </Form>



        </div>


    )
}

export default FormButton