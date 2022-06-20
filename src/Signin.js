import * as React from 'react'
import { render } from 'react-dom'
import { Form, Field } from 'react-final-form'
import { Link } from 'react-router-dom';
// import './Style.css';
// import './App.css'
import { Button } from '@mui/material';
import { TextField } from '@mui/material';

const required = value => (value ? undefined : 'Required')

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function FormButton() {
    const [sent, setSent] = React.useState('Sign In');
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
                    if (!values.Fusername) {
                        errors.username = 'Required'
                    }
                   if (!values.password) {
                        errors.password = 'Required'
                    } 
                    return errors
                }} >

                {({ handleSubmit, form, submitting, pristine, values }) => (


                    <form onSubmit={handleSubmit}><h1>SIGN IN :</h1><br></br>


                        {/* field 3 */}
                        <Field name="Email">
                            {({ input, meta }) => (

                                <div>
                                    <label><strong>Email: </strong></label>
                                    <TextField
                                        {...input}
                                        type="email"
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        size='small'
                                        autoComplete="email"
                                        value={Email}
                                        onChange={handleOnChange}
                                        onMouseOut={emailvalid}
                                        autoFocus
                                    />
                                    {message}
                                    {meta.touched && meta.error && <span>{meta.error}</span>}
                                </div>)}
                        </Field><br></br>

                        {/* field 1 */}
                        <Field name="Fusername" validate={required} >
                            {({ input, meta }) => (

                                <div>
                                    <label>Username: </label>
                                    <TextField
                                        {...input}
                                        helperText="Enter your first name name"
                                        variant="outlined"
                                        size="small"
                                        id="outlined-required"
                                        label="First name"
                                        
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

                        <Button id='btn'
                            disabled={submitting || pristine}
                            variant="contained"
                            onClick={sub}
                            type="submit"
                        >
                            {sent}
                        </Button>
                      
                        <div>

                        </div>
                        <br></br>
                        <Link to="/forgotpassword"> forgot password? </Link> |  <Link to="/"> Sign Up </Link>
                        <br></br>
                        <br></br>

                    </form>

                )}
            </Form>
        </div>
    )
}
export default FormButton