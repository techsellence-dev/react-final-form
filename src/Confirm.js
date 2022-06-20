import * as React from 'react'
import { render } from 'react-dom'
import { Form, Field } from 'react-final-form'
// import './Style.css';
// import './App.css'
import { Button } from '@mui/material';
import { TextField } from '@mui/material';


const required = value => (value ? undefined : 'Required')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function FormButton() {
    const [sent, setSent] = React.useState('Set password');
    const sub = (formObj) => {
        console.log("Submitting , Please wait...");
        console.log(formObj)
        setSent("Please Wait");
    };
    const [Email, setEmail] = React.useState("")
    const [message, setMessage] = React.useState("")
    const emailvalid = () => {
        const regEx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g
        if (regEx.test(Email)) {
            setMessage("Email is valid")
        } else if (!regEx.test(Email)) {
            setMessage("Email is not valid")
        } else {
            setMessage("")
        }
    }
    const handleOnChange = (e) => {
        setEmail(e.target.value);
    };

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
                    if (!values.confirm) {
                        errors.confirm = 'Required'
                    }
                    else if (values.confirm != values.password) {
                        errors.confirm = 'Must match'
                    }
                    return errors
                    return errors
                }} >

                {({ handleSubmit, form, submitting, pristine, values }) => (


                    <form onSubmit={handleSubmit}><h3>Reset Password:</h3><br></br>

                        {/* field 2 */}
                        <Field name="Fusername" validate={required} >
                            {({ input, meta }) => (

                                <div>
                                    <label>Confirmation code: </label>
                                    <TextField
                                        {...input}
                                        type='text'
                                        helperText="Enter the confirmation code"
                                        variant="outlined"
                                        size="small"
                                        id="outlined-required"
                                        label="First name"

                                    />
                                    {meta.touched && meta.error && <span>{meta.error}</span>}
                                </div>)}
                        </Field><br></br>


                        {/* field 7 & 8 */}
                        <Field name="password">
                            {({ input, meta }) => (
                                <div>
                                    <label>New password </label>
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

                        <Field name="confirm">
                            {({ input, meta }) => (
                                <div>
                                    <label>Confirm password</label>
                                    <TextField
                                        helperText="enter the same as the above field"
                                        type="password"
                                        {...input}
                                        variant="filled"
                                        size="small"
                                        id="outlined-required"
                                        label="confirm" />
                                    {meta.error && meta.touched && <span>{meta.error}</span>}
                                </div>
                            )}
                        </Field><br></br>


                        <Button id='btn'
                            disabled={submitting || pristine}
                            variant="contained"
                            onClick={sub}
                            type="submit"
                        >
                            {sent}
                        </Button>
                        <br></br><br></br>

                    </form>

                )}
            </Form>



        </div>


    )
}

export default FormButton